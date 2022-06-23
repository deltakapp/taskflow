/* User Routes at path /api/projects */
/* These routes follow REST standard */
/* Each project is represented as a document in the projects collection */

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Project = require("../models/projectModel");
const User = require("../models/userModel");

/* All endpoints here require authentication */
router.use(auth);

/* Create new project */
router.post("/", async (req, res) => {
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
    res.status(400).send(err); // malformed request syntax error
    console.error(err);
  }
});

/* Check user authorization to edit project */
router.use("/:projectId", (req, res, next) => {
  /* TODO: sanitize req url params */

  // reject unauthorized requests and invalid projectIds
  if (!res.locals.user.projects.includes(req.params.projectId)) {
    res.status(403).send();
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
    res.status(404).send();
    console.error(err);
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

    const deletedProject = await Project.findByIdAndDelete(id);
    if (deletedProject) {
      console.log(`Deleted project ${id}`);
    } else {
      throw new Error("FAILED TO DELETE PROJECT");
    }

    /* delete permissions in users */
    await User.updateMany({ projects: id }, { $pullAll: { projects: [id] } });

    res.status(204).send();
  } catch (err) {
    res.status(404).send(err);
    console.error(err);
  }
});

module.exports = router;
