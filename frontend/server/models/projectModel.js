const mongoose = require("mongoose");

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    stages: [{ type: Schema.Types.ObjectId, ref: "Stage" }],
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, minimize: false }
);

/* Alias 'id' to '_id' */
projectSchema
  .virtual("id") // virtual get '_id' => 'id' is mongoose default
  .set((id) => {
    this._id = id;
  });

/* Rules for converting documents to JSON*/
projectSchema.set("toJSON", {
  virtuals: true, // use virtuals
  versionKey: false, // remove versionKey
  transform: (doc, converted) => {
    converted.projectId = converted.id; // convert id to projectId
    delete converted.id;
    delete converted._id;
    delete converted.createdAt;
  },
});

/* Rules for converting documents to objects (identical to toJSON) */
projectSchema.set("toObject", {
  virtuals: true, // use virtuals
  versionKey: false, // remove versionKey
  transform: (doc, converted) => {
    converted.projectId = converted.id; // convert id to projectId
    delete converted.id;
    delete converted._id;
    delete converted.createdAt;
  },
});

projectSchema.pre(
  "deleteMany",
  { document: false, query: true },
  async function () {
    const doc = await this.model.findOne;
  }
);

/* Model the schema and export it */
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
