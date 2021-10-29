/* User Routes at path /api/projects/:projectId/tasks/:taskId */
/* These routes follow REST standard */
/* Each stage is represented as a document in the project collection */
/* and tasks are subdocuments within stage document */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const stageSchema = require("../schema/stageSchema");

router.use("/", (req, res, next) => {
  console.log("Using Tasks Router (make sure not stages router");
  next();
});

module.exports = router;
