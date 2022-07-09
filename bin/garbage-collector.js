/* deletes temporary user profiles from "tempusers" collection */

const mongoose = require("mongoose");
const URL = process.env.DB_URL;

(async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connection established with database");
    const connection = mongoose.connection;

    connection.db.collection("tempusers").deleteMany({});
    console.log("Deleted documents in collection");

    process.exit();
  } catch (err) {
    console.log(err);
  }

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
})();
