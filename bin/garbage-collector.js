const mongoose = require("mongoose");
const { TempUser } = require("../server/models/userModel");
const URL = process.env.DB_URL;

/* Connect server to mongodb using mongoose */
mongoose
  .connect(URL)
  .then(console.log("Connection established with database"))

  /* Handle initial connection errors */
  .catch((err) => {
    console.error("Database connection error: ", err);
    app.use((req, res) => {
      res.status(503).send("Error: database is temporarily unavailable");
    });
  });

/* Handle connection errors after initial connection */
mongoose.connection.on("error", (err) => {
  console.error(err);
  app.use((req, res) => {
    res.status(503).send("Error: database is temporarily unavailable");
  });
});

console.log("mongoose running");

async function collectGarbage() {
  try {
    console.log("deleting temp users");
    await TempUser.findOneAndDelete({
      name: "Temporary User",
    });
    console.log("completed findOneAndDelete");
    await TempUser.deleteMany({});
    console.log("Deleted temp users");
  } catch (err) {
    console.log(err);
  }
}

collectGarbage();

process.exit();
