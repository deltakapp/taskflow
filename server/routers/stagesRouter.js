/* User Routes at path /api/projects/:projectId */
/* These routes follow REST standard */
/* Each stage is represented as a document in the project collection */
/* and tasks are subdocuments within stage document */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const tasksRouter = require("./tasksRouter");
// const stageSchema = require("../schema/stageSchema");

router.use("/", (req, res, next) => {
  console.log("Using Stages Router");
  next();
});

/* Create a new stage */
router.post("/", async (req, res) => {
  try {
    const stage = new res.locals.stageModel();
    stage.title = req.body.title;
    stage.tasks = req.body.tasks || [];
    const savedStage = await stage.save();

    res.status(201).send(savedStage); //TODO: transform to client-friendly shape
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
});

/* Get stage data */
router.get("/:stageId", async (req, res) => {
  try {
    const stage = await res.locals.stageModel.findById(req.params.stageId);
    console.log(`Found stage ${stage.title}:`);
    res.status(200).send(stage);
  } catch (err) {
    console.error(err);
    res.status(404).send();
  }
});

/* Update stage */
router.patch("/:stageId", async (req, res) => {
  try {
    const stage = await res.locals.stageModel.findById(req.params.stageId);

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
    console.error(err);
    res.status(404).send();
  }
});

/* Delete stage */
router.delete("/:stageId", async (req, res) => {
  try {
    const removed = await res.locals.stageModel.findByIdAndRemove(
      req.params.stageId
    );
    if (removed) {
      console.log(`Deleted stage ${req.params.stageId}`);
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.error(err);
    res.status(404).send();
  }
});

/* Store stageId in res.locals then use tasksRouter */
router.use("/:stageId/tasks", (req, res, next) => {
  res.locals.stageId = req.params.stageId;
  console.log("using tasks router");
  next();
});
router.use("/:stageId/tasks", tasksRouter);

module.exports = router;
