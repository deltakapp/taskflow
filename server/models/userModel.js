const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Project = require("./projectModel");

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
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }], // TODO: add project titles
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
  .virtual("id") // virtual get '_id' => 'id' is mongoose default
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

/* When user is deleted, remove user from project.users */
userSchema.pre("remove", async function (next) {
  const user = this;
  for (const projectId of user.projects) {
    const project = await Project.findById(projectId);
    project.users.filter((userId) => userId !== user._id); // remove userId from project.users

    if (project.users.length === 0) {
      await Project.findByIdAndDelete(projectId); // if no more users remain, delete project
    } else {
      await project.save();
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
