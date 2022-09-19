const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
    },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

/* Alias 'id' to '_id' */
userSchema
  .virtual("id") // note: equivalent getter is enabled by mongoose default
  .set((id) => {
    this._id = id;
  });

/* Rules for converting documents to JSON */
userSchema.set("toJSON", {
  virtuals: true, // use virtuals
  versionKey: false, // remove versionKey
  transform: (doc, converted) => {
    delete converted.password; // remove password
    delete converted.tokens; // remove tokens
    delete converted._id; // remove _id (converted to id)
    delete converted.createdAt;
    delete converted.updatedAt;
  },
});

/* Rules for converting documents to objects (identical to toJSON) */
userSchema.set("toObject", {
  virtuals: true, // use virtuals
  versionKey: false, // remove versionKey
  transform: (doc, converted) => {
    delete converted.password; // remove password
    delete converted.tokens; // remove tokens
    delete converted._id; // remove _id (converted to id)
    delete converted.createdAt;
    delete converted.updatedAt;
  },
});

userSchema.methods.generateAuthToken = function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.AUTH_KEY,
    { expiresIn: 3600 } // 1 hour expiration
  );

  user.tokens = user.tokens.concat({ token });

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    console.log("user not found");
    throw new Error("Unable to login.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    console.log("password mismatch");
    throw new Error("Unable to login.");
  }

  return user;
};

/* When a user is saved, hash password */
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
const TempUser = mongoose.model("TempUser", userSchema);
module.exports = { User, TempUser };
