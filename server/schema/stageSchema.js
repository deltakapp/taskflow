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

/* alias 'id' to '_id' */
stageSchema
  .virtual("id") // virtual get '_id' => 'id' is mongoose default
  .set((id) => {
    this._id = id;
  });

/* Rules for converting documents to JSON */
stageSchema.set("toJSON", {
  virtuals: true, // use virtuals
  versionKey: false, // remove versionKey
  transform: (doc, converted) => {
    delete converted._id; // remove _id (converted to id)
    delete converted.createdAt;

    if (!converted.tasks) {
      converted.tasks = [];
    }
  },
});

/* Rules for converting documents to JSON (identical to toJSON) */
stageSchema.set("toObject", {
  virtuals: true, // use virtuals
  versionKey: false, // remove versionKey
  transform: (doc, converted) => {
    delete converted._id; // remove _id (converted to id)
    delete converted.createdAt;

    if (!converted.tasks) {
      converted.tasks = [];
    }
  },
});

module.exports = stageSchema;
