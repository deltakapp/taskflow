const express = require("express");
const PORT = process.env.PORT || 5000;

express()
  .get("/", (req, res) => {
    res.status(201).send("Hello world!");
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
