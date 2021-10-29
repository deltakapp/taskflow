/* User Routes at path /api/projects */
/* These routes follow REST standard */
/* Each project is represented as a collection in the database, and stages */
/* are represented as documents within that collection. */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const stageSchema = require("../schema/stageSchema");
const stagesRouter = require("./stagesRouter");
const tasksRouter = require("./tasksRouter");

const projectEditors = {}; //lists current editors (subscribers) for each project

/* All endpoints here require authentication */
router.use(auth);

/* Check user authorization to edit project */
router.use("/:projectId", (req, res, next) => {
  /* TODO: sanitize req url params */
  const projectId = req.params.projectId;

  // reject unauthorized requests
  if (!res.locals.user.projects.includes(projectId)) {
    res.status(403).send();
    /* Note: I could add 404-checking for invalid :projectId */
    /* but that would add time overhead to query the database again */
    /* and those routes should fail to authorize anyway */
  } else {
    // if (!projectEditors.hasOwn(projectId)) {
    //   projectEditors.projectId = [];
    // }
    // if (!projectEditors.projectId.includes(req.locals.user._id))
    /* create project-specific stage model */
    res.locals.stageModel = mongoose.model(projectId, stageSchema, projectId);
    /* TODO: convert above into persistent list a la projectEditors */
    next();
  }
});

/* Create new project */
router.post("/", async (req, res) => {
  try {
    // TODO: make url-compatible
    let projectId = req.body.projectName;

    /* Check if duplicate name */
    const projects = await mongoose.connection.db
      .listCollections({}, { nameOnly: true })
      .toArray();
    const duplicateName = projects.some(
      (project) => project.name === projectId
    );

    if (duplicateName) {
      res.status(409).send(); // TODO: add alternate project naming
    } else {
      /* create collection to represent new project */
      res.locals.stageModel = mongoose.model(projectId, stageSchema, projectId);
      await res.locals.stageModel.createCollection();

      /* add projectId to user document (creates authorization to edit) */
      res.locals.user.projects.push(projectId);
      await res.locals.user.save();

      res.status(201).send({ projectId: projectId }); // add new URL in this body?
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* Get project data */
router.get("/:projectId", async (req, res) => {
  try {
    const projectData = await res.locals.stageModel.find();
    console.log("found project data");
    res.status(200).send(projectData); //TODO: check if data too large
  } catch (err) {
    console.error(err);
    res.status(404).send(err); //TODO: insert 404 html page
  }
});

/* Delete a project */
router.delete("/:projectId", async (req, res) => {
  try {
    const projectId = req.params.projectId;

    /* Delete collection */
    await mongoose.connection.db.dropCollection(projectId);
    console.log(`Deleted project ${projectId}`);

    /* delete permissions in users */
    await User.updateMany(
      { projects: projectId },
      { $pullAll: { projects: [projectId] } }
    );

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(404).send(err);
  }
});

/* Start an editing session */
// router.patch("/:projectId", async (req, res) => {
//   try {
//     const projectId = req.params.projectId;

//   }
// })

/* End an editing session */

/* task routes are handled by tasksRouter */
router.use("/:projectId/stages/:stageId/tasks", tasksRouter);

/* stage routes are handled by stagesRouter */
router.use("/:projectId/stages", stagesRouter);

module.exports = router;
