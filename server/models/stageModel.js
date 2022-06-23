const mongoose = require("mongoose");
const { taskSchema } = require("./taskModel");

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
  { timestamps: true, minimize: false }
);

/* Alias 'id' to '_id' */
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
    converted.stageId = converted.id;
    delete converted.id;
    delete converted._id; // remove _id (converted to id)
    delete converted.createdAt;
  },
});

/* Rules for converting documents to objects (identical to toJSON) */
stageSchema.set("toObject", {
  virtuals: true, // use virtuals
  versionKey: false, // remove versionKey
  transform: (doc, converted) => {
    converted.stageId = converted.id;
    delete converted.id;
    delete converted._id; // remove _id (converted to id)
    delete converted.createdAt;
  },
});

module.exports = mongoose.model("Stage", stageSchema);
