const mongoose = require("mongoose");
const taskSchema = require("./taskSchema");

const stageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 30,
    },
    tasks: [taskSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = stageSchema;
