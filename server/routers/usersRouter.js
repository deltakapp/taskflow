/* User Routes at path /api/users */

/* These routes do not follow REST standard: request Authorization header */
/* renders user-specific resource-naming superfluous, and endpoints which */
/* precede auth (user creation) do not need user ID */

const express = require("express");
const { User, TempUser } = require("../models/userModel");
const Project = require("../models/projectModel");
const router = express.Router();
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

/* Create user */
router.post("/", async (req, res, next) => {
  /* Create account from temporary user */
  if (req.body.flag === "IMPORT") {
    try {
      await authenticateTempUser(req, res);
      const user = new User({
        id: res.locals.user.id,
        projects: res.locals.user.projects, // import projects
      });
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
      const token = user.generateAuthToken();
      await user.save();
      await user.populate("projects", "title"); // fetch project titles
      res.status(201).send({ user, token });
      return;
    } catch (err) {
      console.error(err);
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
      return;
    }
  } else {
    /* Standard user account creation */
    try {
      const user = new User(req.body);
      const token = user.generateAuthToken();
      await user.save();
      // TODO: sendWelcomeEmail
      res.status(201).send({ user, token });
    } catch (err) {
      if (err.code === 11000) {
        res
          .status(409)
          .send("This email address is already registered to another user.");
      } else {
        console.error(err);
        res
          .status(400)
          .send(
            "Email must be valid email address and password must be minimum 8 characters."
          );
      }
    }
  }
});

/* Create temporary user for users to preview app */
router.post("/temp/", async (req, res) => {
  const tempNumber1 = Math.floor(Math.random() * 100000); // random int < 100000
  const tempNumber2 = Math.floor(Math.random() * 10000); // random int < 100000
  const name = `Temporary User`;
  const email = `${tempNumber1}@invalidemail.com`;
  const password = `Password${tempNumber2}`;
  try {
    const user = new TempUser({ name: name, email: email, password: password });
    const token = user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (err) {
    if (err.code === 11000) {
      res
        .status(409)
        .send(
          "We are experiencing a heavy load of users previewing our app. Please try again."
        );
      console.error(`Temp user overlap conflict${tempNumber}`);
    } else {
      res
        .status(500)
        .send("Server is experiencing heavy load. Please try again later.");
      console.error(err);
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
    const id = res.locals.user.id;
    user = await User.findByIdAndDelete(id);

    /* remove user authorization from projects */
    await Project.updateMany({ users: id }, { $pullAll: { users: [id] } });

    console.log(`user ${id} deleted`);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err); // should never be reached
  }
});

/* Modify user */
router.patch("/", auth, async (req, res) => {
  try {
    let user = res.locals.user;

    /* Update projects list */
    if (req.body.projects) {
      user.projects = req.body.projects;
    }

    /* Update user name */
    if (req.body.name) {
      user.name = req.body.name;
    }

    /* Update email address */
    if (req.body.email) {
      user.email = req.body.email;
    }

    /* Update password */
    if (req.body.newPassword) {
      /* check old password */
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

/* Authenticate a temp user to prepare for account creation */
/* This works mostly the same as /middleware/auth.js without next() */
async function authenticateTempUser(req, res) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.AUTH_KEY);

    /* Find user by decoded credentials */
    let user = await TempUser.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    res.locals.user = user; // add user to local variables for mongoose
  } catch (err) {
    res.status(401).send({ error: "User authentication failed" });
  }
}

module.exports = router;
