const mongoose = require("mongoose");
const { User, TempUser } = require("../server/models/userModel");
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

(async () => {
  const tempNumber = Math.floor(Math.random() * 10000); // random int < 10000
  const name = `Temporary User`;
  const email = `${tempNumber}@invalidemail.com`;
  const password = `Password${tempNumber}`;
  try {
    const user = new TempUser({ name: name, email: email, password: password });
    const token = user.generateAuthToken();
    console.log("creating temp user");
    await user.save();
    console.log("deleting one user");
    await User.findByIdAndDelete("62c903e9ee5a635f12dcc0f0");
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
})();

process.exit();
