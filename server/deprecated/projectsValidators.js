const mongoose = require("mongoose");
const assert = require("assert");

module.exports.validateProjectPost = async (req, res, next) => {
  try {
    assert(typeof req.body.title === "string");
    next();
  } catch (err) {
    await res.status(400).send();
    console.error(err);
  }
};
