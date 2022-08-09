/* deletes temporary user profiles and their projects */

const mongoose = require("mongoose");
const { TempUser } = require("../server/models/userModel");
const Project = require("../server/models/projectModel");
const Stage = require("../server/models/stageModel");
const URL = process.env.DB_URL;

(async () => {
  try {
    /* Connect to mongodb database */
    await mongoose.connect(URL);
    console.log("Connection established with database");

    /* Find temp users older than 2 hours and delete */
    const tempUsers = await TempUser.find({
      createdAt: { $lt: Date.now() - 72000 },
    });

    /* list all projects belonging to temporary users and delete users */
    const projectIds = [];
    for (const user of tempUsers) {
      for (const projectId of user.projects) {
        const project = await Project.find({ projectId });
        await Stage.deleteMany({ id: { $in: project.stages } });
        await Project.findByIdAndDelete(id);
      }
      await TempUser.findByIdAndDelete(user.id);
    }
    console.log(`Deleted ${tempUsers.length} temporary users`);

    console.log("Exiting process.");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
