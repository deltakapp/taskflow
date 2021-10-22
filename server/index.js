const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

/* Create express application */
const app = express();

/* Log all requests */
app.use((req, res, next) => {
  const filename = path.basename(req.url);
  const dirname = path.dirname(req.url);
  console.log(`${req.method} ${dirname}/${filename}`);
  next();
});

/* root directory path for frontend static build files */
app.use(express.static(path.join(__dirname, "../frontend/build")));

/* homepage path, dynamic routes point here */
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

/* test path */
app.get("/test", async (req, res) => {
  res.status(200).send("Success");
});

/* listen for requests */
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
