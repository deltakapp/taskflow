/* This file is optimized for time to boot */
/* Consider optimization with every line */
console.time("full server");
console.time("imports");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); //NOTE: remove for production, also app.use(cors())
const path = require("path");
const usersRouter = require("./routers/usersRouter");
const projectsRouter = require("./routers/projectsRouter");

const PORT = process.env.PORT || 5000;
const URL = process.env.DB_URL;
console.timeEnd("imports");

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

/* Create express application */
const app = express();
app.use(cors());
app.use(express.json());

// logging for all requests
app.use((req, res, next) => {
  const filename = path.basename(req.url);
  const dirname = path.dirname(req.url);
  console.log(`${req.method} ${dirname}/${filename}`);
  next();
});

/* root directory path for frontend static build files */
app.use(express.static(path.join(__dirname, "../frontend/build")));

/* test path */
app.get("/test", async (req, res) => {
  res.status(200).send("Success");
});

/* API Routers */
app.use("/api/users", usersRouter);
app.use("/api/projects", projectsRouter);

/* homepage path, dynamic routes point here */
app.get("/*", function (req, res) {
  console.log("GETting homepage");
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

/* listen for requests */
app.listen(PORT, function () {
  console.timeEnd("full server");
  console.log(`App started on port ${PORT}`);
});
