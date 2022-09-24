/* User Routes at path /api/projects */
/* These routes follow REST standard */
/* Each project is represented as a document in the projects collection */

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middleware/auth");
const Project = require("../models/projectModel");
const { User } = require("../models/userModel");
const Stage = require("../models/stageModel");

/* All endpoints here require authentication */
router.use(auth);

/* Create new project */
router.post("/", async (req, res) => {
  console.log(req.body);
  /* Forbid temporary users from creating more than 3 projects */
  if (
    res.locals.user.id === "Temporary User" &&
    res.locals.user.projects.length > 2
  ) {
    res.status(403).send("To create more than 3 projects, please sign up.");
    return;
  }
  try {
    let project = new Project();
    project.title = req.body.title;
    project.users = res.locals.user.id;
    project = await project.save();

    /* add id to user document (creates authorization to edit) */
    res.locals.user.projects.push(project.id);
    await res.locals.user.save();

    res.status(201).send({ project: project });
  } catch (err) {
    res.status(400).send("Project must have a title");
    console.error(err);
  }
});

/* Check user authorization to edit project */
router.use("/:projectId", (req, res, next) => {
  /* TODO: sanitize req url params */

  // reject unauthorized requests and invalid projectIds
  if (!res.locals.user.projects.includes(req.params.projectId)) {
    res.status(403).send("You are not authorized to view this project.");
  } else {
    next();
  }
});

/* Read project data */
router.get("/:projectId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    await project.populate("stages");
    res.status(200).send({ project: project });
  } catch (err) {
    res.status(404).send("Project has been deleted.");
  }
});

/* Update a project */
router.patch("/:projectId", async (req, res) => {
  try {
    const body = {}; // response object to be modified before send

    /* update stages */
    if (req.body.stages) {
      req.body.stages.forEach(async (stage) => {
        await Stage.findByIdAndUpdate(stage.stageId, {
          title: stage.title,
          tasks: stage.tasks,
        });
      });
    }

    /* update title */
    if (req.body.title) {
      let project = await Project.findById(req.params.projectId);
      project.title = req.body.title;
      project = await project.save();
      body.project = project;
    }

    res.status(200).send(body);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).send(err); // malformed request syntax error
    } else {
      res.status(404).send(); // project not found
    }
    console.error(err);
  }
});

/* Delete a project */
router.delete("/:projectId", async (req, res) => {
  try {
    const id = req.params.projectId;

    const project = await Project.findById(id);
    await Stage.deleteMany({ id: { $in: project.stages } });

    const deletedProject = await Project.findByIdAndDelete(id);

    if (deletedProject) {
      console.log(`Deleted project ${id}`);
    } else {
      throw new Error(`FAILED TO DELETE PROJECT ${id}`);
    }

    /* delete permissions in users */
    await User.updateMany({ projects: id }, { $pullAll: { projects: [id] } });

    res.status(204).send();
  } catch (err) {
    res
      .status(404)
      .send(
        "Server unable to delete project. Check Project's existence and try again."
      );
    console.error(err);
  }
});

module.exports = router;
