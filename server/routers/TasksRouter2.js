/* User Routes at path /api/projects/:projectId/tasks/:taskId */
/* These routes follow REST standard */
/* Each stage is represented as a document in the stages collection */
/* and tasks are subdocuments within stage document */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const taskSchema = require("../schema/taskSchema");
const Task = mongoose.model("Task", taskSchema);

/* Create a new task */
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    res.locals.stage.tasks.push(task);
    await res.locals.stage.save();
    res.status(201).send(task); //TODO: transform to client-friendly shape
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
});

/* Delete task */
router.delete("/:taskId", async (req, res) => {
  try {
    res.locals.stage.tasks.id(req.params.taskId).remove();
    await res.locals.stage.save();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(404).send();
  }
});

module.exports = router;
