const mongoose = require("mongoose");
const { User, TempUser } = require("../server/models/userModel");
const URL = process.env.DB_URL;
console.log(URL);

(async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connection established with database");
    const connection = mongoose.connection;
    connection.db.collection("tempusers").deleteMany({});
    console.log("Deleted documents in collection");
  } catch (err) {
    console.log(err);
  }

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
})();

// /* Connect server to mongodb using mongoose */
// mongoose
//   .connect(URL)
//   .then(() => {
//     console.log("Connection established with database");
//     const connection = mongoose.connection;
//     connection.db.collection("tempusers", function (err, collection) {
//       collection.deleteMany({});
//     });
//     console.log("Deleted documents in collection");
//   })

//   /* Handle initial connection errors */
//   .catch((err) => {
//     console.error("Database connection error: ", err);
//     app.use((req, res) => {
//       res.status(503).send("Error: database is temporarily unavailable");
//     });
//   });

// /* Handle connection errors after initial connection */
// mongoose.connection.on("error", (err) => {
//   console.error(err);
//   app.use((req, res) => {
//     res.status(503).send("Error: database is temporarily unavailable");
//   });
// });

// (async () => {
//   try {
//     console.log("deleting collection");
//     mongoose.connection.db.tempusers.deleteMany({});
//     console.log("deleting one user");
//     await User.findByIdAndDelete("62c903e9ee5a635f12dcc0f0");
//     console.log("deleting temp users");
//     await TempUser.findOneAndDelete({
//       name: "Temporary User",
//     });
//     console.log("completed findOneAndDelete");
//     await TempUser.deleteMany({});
//     console.log("Deleted temp users");
//   } catch (err) {
//     console.log(err);
//   }
// })();

// process.exit();
