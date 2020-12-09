const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

/**
 * User Schema
 */
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hash and salt fields will be add by passportLocalMongoose plugin
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
