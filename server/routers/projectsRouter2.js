/* User Routes at path /api/projects */
/* These routes follow REST standard */
/* Each project is represented as a document in the projects collection */

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Project = require("../models/projectModel");
const User = require("../models/userModel");
const stagesRouter = require("./stagesRouter");

/* All endpoints here require authentication */
router.use(auth);

/* Check user authorization to edit project */
router.use("/:projectId", (req, res, next) => {
  /* TODO: sanitize req url params */

  // reject unauthorized requests and invalid projectIds
  if (!res.locals.user.projects.includes(req.params.projectId)) {
    res.status(403).send();
  }
});

/* Create new project */
router.post("/", async (req, res) => {
  try {
    const project = new Project();
    project.title = req.body.title;
    project = await project.save();

    /* add id to user document (creates authorization to edit) */
    res.locals.user.projects.push(project.id);
    await res.locals.user.save();

    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* Read project data */
router.get("/:projectId", async (req, res) => {
  try {
    console.time("Load Project Data");
    const projectData = await Project.findById(req.params.projectId);
    const stagesData = [];
    console.time("Load Stages Data");
    for (const stageId of projectData.stages) {
      await stagesData.append(stageModel.findById(stageId));
      console.log(stagesData[-1]);
    }
    console.timeEnd("LoadStagesData"); // if > 0.05s per stage, optimize.
    console.timeEnd("Load Project Data");
    res.status(200).send(projectData); //TODO: check if data too large
  } catch (err) {
    console.error(err);
    res.status(404).send(err);
  }
});

/* Update a project */
router.patch("/:projectId", async (req, res) => {
  try {
    /* update fields as specified */
    const project = await Project.findById(req.params.projectId);

    if (req.body.title) {
      console.log("updating project title");
      project.title = req.body.title;
    }

    if (req.body.stages) {
      console.log("updating stages");
      project.stages = req.body.stages;
    }

    await project.save();
    console.log("Updated project");
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(404).send();
  }
});

/* Delete a project */
router.delete("/:projectId", async (req, res) => {
  try {
    const id = req.params.projectId;

    /* Delete collection */
    const deletedProject = await Project.findByIdAndDelete(id);
    if (deletedProject) {
      console.log(`Deleted project ${id}`);
    } else {
      console.error("FAILED TO DELETE PROJECT");
      throw new Error();
    }

    /* delete permissions in users */
    await User.updateMany({ projects: id }, { $pullAll: { projects: [id] } });

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(404).send(err);
  }
});

/* stage routes are handled by stagesRouter */
router.use("/:projectId/stages", stagesRouter);

module.exports = router;
