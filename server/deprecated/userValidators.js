const mongoose = require("mongoose");
const assert = require("assert");

module.exports.validateUserPost = (req, res, next) => {
  try {
    /* email and password must be strings */
    assert(req.body.email instanceof String);
    assert(req.body.password instanceof String);
    next();
  } catch (err) {
    res.status(400).send();
    console.error(err);
  }
};

module.exports.validateUserPatch = (req, res, next) => {
  try {
    /* stages must be an array of ObjectIds */
    if (req.body.stages) {
      assert(req.body.stages.every((value) => mongoose.isValidObjectId(value)));
    }
    // note: email validation is handled in userSchema by validator module
    next();
  } catch (err) {
    res.status(400).send();
    console.error(err);
  }
};
