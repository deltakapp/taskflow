const mongoose = require("mongoose");
console.log("mongoose imported");
const TempUser = require("../server/models/userModel");
console.log("temp user imported");
const URL = process.env.DB_URL;
console.log("dburl");

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

try {
  await TempUser.deleteMany({});
} catch (err) {
  console.log(err);
}
