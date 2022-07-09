/* User Routes at path /api/users */

/* These routes do not follow REST standard: request Authorization header */
/* renders user-specific resource-naming superfluous, and endpoints which */
/* precede auth (user creation) do not need user ID */

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
      res
        .status(409)
        .send("This email address is already registered to another user.");
    } else {
      res
        .status(400)
        .send(
          "Email must be valid email address and password must be minimum 8 characters."
        );
    }
  }
});

/* User login */
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = user.generateAuthToken();
    await user.save();
    await user.populate("projects", "title"); // fetch project titles
    res.status(200).send({ user, token }); //move token to header?

    /* Delete expired tokens AFTER response sent for expedience */
    user.tokens = user.tokens.filter((token) => {
      return Date.now() < 1000 * jwt.decode(token.token).exp;
    });
    await user.save();
  } catch (err) {
    res.status(404).send("User credentials do not match. Please try again.");
  }
});

/* All routes below here use auth middleware. */

/* User logout */
router.post("/logout", auth, async (req, res) => {
  try {
    /* delete token sent with request */
    res.locals.user.tokens = res.locals.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    /* delete any replacement token set by auth */
    const replacementToken = res.get("X-Auth-Token");
    if (replacementToken) {
      res.locals.user.tokens = res.locals.user.tokens.filter((token) => {
        return token.token !== replacementToken;
      });
      res.removeHeader("X-Auth-Token");
    }
    await res.locals.user.save();

    res.status(200).send();
  } catch (err) {
    res.status(500).send(err); // should never be reached
  }
});

/* Delete user */
router.delete("/", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(res.locals.user.id);
    console.log("user deleted");
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err); // should never be reached
  }
});

/* Modify user */
router.patch("/", auth, async (req, res) => {
  try {
    let user = res.locals.user;

    if (req.body.projects) {
      user.projects = req.body.projects;
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.newPassword) {
      try {
        user = await User.findByCredentials(
          req.body.email,
          req.body.oldPassword
        );
      } catch {
        res.status(401).send(); // Not authorized
      }
      user.password = req.body.newPassword;
    }

    user = await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err); // malformed request syntax error
  }
});

module.exports = router;
