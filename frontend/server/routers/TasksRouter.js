/* User Routes at path /api/projects/:projectId/tasks/:taskId */
/* These routes follow REST standard */
/* Each stage is represented as a document in the stages collection */
/* and tasks are subdocuments within stage document */

const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel.js");

/* Create a new task */
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    res.locals.stage.tasks.push(task);
    await res.locals.stage.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send("Task must have a title"); // malformed request syntax error
    console.error(err);
  }
});

router.patch("/:taskId", async (req, res) => {
  const stage = res.locals.stage;
  try {
    const task = stage.tasks.find((task) => task.id === req.params.taskId);

    /* update fields as specified */
    if (req.body.title) {
      task.title = req.body.title;
    }
    if (req.body.details) {
      task.details = req.body.details;
    }

    await stage.save();
    console.log(`Updated Stage ${stage.title} task ${task.title}`);
    res.status(200).send(task);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      // malformed request syntax
      res.status(400).send("Task must have a title");
    } else {
      res
        .status(404)
        .send("Task not found. Please check its existence and try again.");
    }
    console.error(err);
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
    res
      .status(404)
      .send("Task not found. Please check its existence and try again.");
  }
});

module.exports = router;
