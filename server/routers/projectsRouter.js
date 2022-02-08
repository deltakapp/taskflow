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

const projectEditors = {}; //lists current editors (subscribers) for each project

/* All endpoints here require authentication */
router.use(auth);

/* Check user authorization to edit project */
router.use("/:projectId", (req, res, next) => {
  /* TODO: sanitize req url params */
  const id = req.params.projectId;
  console.log(req.params);

  // reject unauthorized requests
  if (!res.locals.user.projects.includes(id)) {
    res.status(403).send();
    /* Note: I could add 404-checking for invalid :projectId */
    /* but that would add time overhead to query the database again */
    /* and those routes should fail to authorize anyway */
  } else {
    /* create project-specific stage model */
    res.locals.stageModel = mongoose.model(id, stageSchema, id);
    /* TODO: convert above into persistent list a la projectEditors */
    next();
  }
});

/* Create new project */
router.post("/", async (req, res) => {
  try {
    // TODO: make url-compatible
    let id = req.body.title;

    /* Check if duplicate name */
    const projects = await mongoose.connection.db
      .listCollections({}, { nameOnly: true })
      .toArray();
    const duplicateName = projects.some((project) => project.name === id);

    if (duplicateName) {
      res.status(409).send(); // TODO: add alternate project naming
    } else {
      /* create collection to represent new project */
      res.locals.stageModel = mongoose.model(id, stageSchema, id);
      await res.locals.stageModel.createCollection();

      /* add id to user document (creates authorization to edit) */
      res.locals.user.projects.push(id);
      await res.locals.user.save();

      res.status(201).send({ id: id }); // add new URL in this body?
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* Read project data */
router.get("/:projectId", async (req, res) => {
  try {
    const projectData = await res.locals.stageModel.find();
    console.log("found project data");
    console.log(projectData);
    res.status(200).send(projectData); //TODO: check if data too large
  } catch (err) {
    console.error(err);
    res.status(404).send(err); //TODO: insert 404 html page
  }
});

/* Delete a project */
router.delete("/:projectId", async (req, res) => {
  try {
    const id = req.params.projectId;

    /* Delete collection */
    const collectionDeleted = await mongoose.connection.collection(id).drop();
    if (collectionDeleted) {
      console.log(`Deleted project ${id}`);
    } else {
      console.log("FAILED TO DELETE PROJECT");
    }

    /* delete permissions in users */
    await User.updateMany({ projects: id }, { $pullAll: { projects: [id] } });

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(404).send(err);
  }
});

/* Start an editing session */
// router.patch("/:projectId", async (req, res) => {
//   try {
//     const id = req.params.projectId;

//   }
// })

/* End an editing session */

/* stage routes are handled by stagesRouter */
router.use("/:projectId/stages", stagesRouter);

module.exports = router;
