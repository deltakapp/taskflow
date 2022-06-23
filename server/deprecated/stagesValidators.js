const mongoose = require("mongoose");
const assert = require("assert");

module.exports.validatePostStage = async (req, res, next) => {
  try {
    assert(typeof req.body.title === "string");
    assert(mongoose.isValidObjectId(req.body.projectId));
    next();
  } catch (err) {
    await res.status(400).send();
    console.error(err);
  }
};

module.exports.validatePatchStage = async (req, res, next) => {
  try {
    if (req.body.title) {
      assert(typeof req.body.title === "string");
    } else if (req.body.tasks) {
      assert(typeof req.body.tasks === "array");
      for (const task of req.body.tasks) {
        assert(typeof task === "object");
        assert(typeof task.title === "string");
        if (task.details) {
          assert(typeof task.details === "string");
        }
      }
    } else {
      throw new Error("No valid body parameters found");
    }
  } catch (err) {
    await res.status(400).send();
    console.error(err);
  }
};
