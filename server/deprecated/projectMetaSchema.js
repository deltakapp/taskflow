/* Model for project metadata, stored as a single document per collection, titled "META" */
const mongoose = require("mongoose");

const projectMetaSchema = new mongoose.Schema({
  alias: {
    type: String,
    required: true,
    trim: true,
  },
  /* boolean whether project has multiple authorized users */
  multiUser: {
    type: Boolean,
    default: false,
  },
  /* list of users currently working on project (subscribed for updates) */
  currentUsers: [String],
});

module.exports = projectMetaSchema;
