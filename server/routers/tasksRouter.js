/* User Routes at path /api/projects/:projectId/tasks/:taskId */
/* These routes follow REST standard */
/* Each stage is represented as a document in the project collection */
/* and tasks are subdocuments within stage document */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const taskSchema = require("../schema/taskSchema");
const Task = mongoose.model("Task", taskSchema);

/* Create a new task */
router.post("/", async (req, res) => {
  try {
    const stage = await res.locals.stageModel.findById(res.locals.stageId);
    const task = new Task(req.body);
    stage.tasks.push(task);
    await stage.save();
    res.status(201).send(task); //TODO: transform to client-friendly shape
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
});

/* Delete task */
router.delete("/:taskId", async (req, res) => {
  try {
    const stage = await res.locals.stageModel.findById(res.locals.stageId);
    stage.tasks.id(req.params.taskId).remove();
    await stage.save();
  } catch (err) {
    console.error(err);
    res.status(404).send();
  }
});

module.exports = router;
