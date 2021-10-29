const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 30,
    },
    details: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = taskSchema;
