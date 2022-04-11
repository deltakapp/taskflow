const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  console.log("using auth");

  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.AUTH_KEY);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    if (Date.now() > decoded.exp * 1000 - 1800000) {
      console.log("REFRESHING STALE TOKEN");
      res.set("X-Auth-Token", user.generateAuthToken());
    }

    res.locals.user = user.toObject();
    next();
  } catch (err) {
    res.status(401).send({ error: "User authentication failed" });
  }
};

module.exports = auth;
