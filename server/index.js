/* Node.js server entry point */
/* This file is optimized for time to boot */
/* Consider optimization with every line */

/* Boot timers for optimization */
console.time("full server");
console.time("imports");

const express = require("express"); // API framework
const mongoose = require("mongoose"); // for interfacing with mongodb
const cors = require("cors"); //NOTE: remove for production, also app.use(cors())
const path = require("path"); // for path logging
const filter = require("content-filter"); // filter malicious requests
const usersRouter = require("./routers/usersRouter");
const projectsRouter = require("./routers/projectsRouter");
const stagesRouter = require("./routers/stagesRouter");

const PORT = process.env.PORT || 5000;
const URL = process.env.DB_URL; // npm start fails to load .env ///FIX ME///
if (!URL) console.error("No Environmental DB URL variable found.");
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
app.use(cors()); // TODO: REMOVE FROM PROD
app.use(express.json()); // parse json in request bodies
app.use(filter({ methodList: ["GET", "POST", "PUT", "PATCH", "DELETE"] })); // filter malicious requests

/* logging for all requests */
app.use((req, res, next) => {
  const filename = path.basename(req.url);
  const dirname = path.dirname(req.url);
  console.log(`${req.method} ${dirname}/${filename}`);
  next();
});

/* root directory path for frontend static build files */
app.use(express.static(path.join(__dirname, "../frontend/build")));

/* API Routers */
app.use("/api/users", usersRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/stages", stagesRouter);

/* test path */
app.get("/test", async (req, res) => {
  res.status(200).send("Success");
});

/* homepage path; dynamic routes point here */
app.get("/*", async (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

/* listen for requests */
app.listen(PORT, () => {
  console.timeEnd("full server");
  console.log(`App started on port ${PORT}`);
});
