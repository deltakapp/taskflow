const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
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

    /* if token expires in less than 40 minutes, refresh auth token */
    if (decoded.exp * 1000 - Date.now() < 2400000) {
      console.log("REFRESHING STALE TOKEN");
      res.set("Access-Control-Expose-Headers", "X-Auth-Token");
      res.set("X-Auth-Token", user.generateAuthToken());
      user.save();
    }

    res.locals.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "User authentication failed" });
  }
};

module.exports = auth;
