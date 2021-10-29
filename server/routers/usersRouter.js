/* User Routes at path /api/users */
/* this is derived from routers/user-jwt.js in COPY OF working cookies */

/* These routes do not follow REST standard: auth middleware renders */
/* user-specific resource-naming unnecessary, and endpoints which */
/* precede auth (user creation and login) do not need user ID */

const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

/* Create user */
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = user.generateAuthToken();
    await user.save();
    // TODO: sendWelcomeEmail
    console.log("user created");
    res.status(201).send({ user, token });
  } catch (err) {
    if (err.code === 11000) {
      console.log("User creation failed: duplicate email");
      res.status(409).send();
    } else {
      console.log(err);
      res.status(400).send(err);
    }
  }
});

/* User login */
router.post("/login", async (req, res) => {
  console.log("Attempting login");
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (user) {
      console.log("user found");
    }
    const token = user.generateAuthToken();
    await user.save();
    res.status(200).send({ user, token }); //move token to header?

    /* Delete expired tokens AFTER response sent for expedience */
    user.tokens = user.tokens.filter((token) => {
      return Date.now() < 1000 * jwt.decode(token.token).exp;
    });
    await user.save();
  } catch (err) {
    console.log("error in login route");
    res.status(404).send(err);
  }
});

/* All routes below here use auth middleware. Errors outisde of auth */
/* should fail with 5XX error codes. */

/* User logout */
router.post("/logout", auth, async (req, res) => {
  try {
    /* delete token sent with request */
    res.locals.user.tokens = res.locals.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    /* delete any replacement token set by auth */
    const replacementToken = res.get("X-Replacement-Token");
    if (replacementToken) {
      console.log("deleting replacementToken");
      res.locals.user.tokens = res.locals.user.tokens.filter((token) => {
        return token.token !== replacementToken;
      });
      res.removeHeader("X-Replacement-Token");
    }
    await res.locals.user.save();

    res.status(200).send();
  } catch (err) {
    res.status(500).send(err); //should never be reached
  }
});

/* Delete user */
router.delete("/", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(res.locals.user._id);
    console.log("user deleted");
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err); //should never be reached
  }
});

/* Update user email address */
//TODO
//router.patch("/users");

module.exports = router;
