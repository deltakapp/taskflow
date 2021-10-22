const express = require("express");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

/* Create express application */
const app = express();
app.use(cors());
app.use(express.json());

/* Log all requests */
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

app.get("/testfetch", async (req, res) => {
  res.status(200).send(req.message);
});

/* homepage path; dynamic routes point here */
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

/* listen for requests */
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
