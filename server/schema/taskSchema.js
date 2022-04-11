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

/* Alias 'id' to '_id' */
taskSchema
  .virtual("id") // virtual get '_id' => 'id' is mongoose default
  .set((id) => {
    this._id = id;
  });

/* Rules for converting documents to JSON*/
taskSchema.set("toJSON", {
  virtuals: true, // use virtuals
  versionKey: false, // remove versionKey
  transform: (doc, converted) => {
    delete converted._id; // remove _id (converted to id)
    delete converted.createdAt;
  },
});

/* Rules for converting documents to objects (identical to toJSON) */
taskSchema.set("toObject", {
  virtuals: true, // use virtuals
  versionKey: false, // remove versionKey
  transform: (doc, converted) => {
    delete converted._id; // remove _id (converted to id)
    delete converted.createdAt;
  },
});

module.exports = taskSchema;
