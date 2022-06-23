/* User Routes at path /api/stages */
/* These routes follow REST standard */

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const tasksRouter = require("./TasksRouter");
const Project = require("../models/projectModel");
const Stage = require("../models/stageModel");

/* Use auth for all subsequent routes */
router.use("/", auth, (req, res, next) => {
  console.log("Using Stages Router");
  next();
});

/* Create a new stage */
router.post("/", async (req, res) => {
  try {
    // Create Stage
    const stage = new Stage();
    stage.title = req.body.title;
    stage.tasks = req.body.tasks || [];
    const savedStage = await stage.save();

    // Add stageId to parent project.stages
    await Project.findByIdAndUpdate(
      req.body.projectId,
      { $push: { stages: savedStage.id } },
      { runValidators: true } // validate update according to schema
    );

    res.status(201).send(savedStage);
  } catch (err) {
    res.status(400).send(err); // malformed request syntax error
    console.error(err);
  }
});

/* Get stage data */
router.get("/:stageId", async (req, res) => {
  try {
    const stage = await Stage.findById(req.params.stageId);
    console.log(`Found stage ${stage.title}:`);
    res.status(200).send(stage);
  } catch (err) {
    res.status(404).send();
    console.error(err);
  }
});

/* Update stage */
router.patch("/:stageId", async (req, res) => {
  try {
    const stage = await Stage.findById(req.params.stageId);

    /* update fields as specified */
    if (req.body.title) {
      stage.title = req.body.title;
    }
    if (req.body.tasks) {
      stage.tasks = req.body.tasks;
    }

    await stage.save();
    console.log(`Updated stage ${stage.title}:`);
    res.status(200).json(stage);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).send(err); // malformed request syntax error
    } else {
      res.status(404).send(); // project not found
    }
    console.error(err);
  }
});

/* Delete stage */
router.delete("/:stageId", async (req, res) => {
  try {
    const removed = await Stage.findByIdAndRemove(req.params.stageId);
    if (removed) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send(err); // should never be reached
    console.error(err);
  }
});

/* Store stage in res.locals, then use tasksRouter */
router.use("/:stageId/tasks", async (req, res, next) => {
  try {
    res.locals.stage = await Stage.findById(req.params.stageId);
    console.log("using tasks router");
    next();
  } catch (err) {
    res.status(404).send(err);
    console.error(err);
  }
});
router.use("/:stageId/tasks", tasksRouter);

module.exports = router;
