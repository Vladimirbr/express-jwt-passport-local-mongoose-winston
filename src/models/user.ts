import { Schema, model } from "mongoose";

import passportLocalMongoose from "passport-local-mongoose";

import { IUser } from "../interfaces/user";

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
      trim: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true } //add createdAt and updatedAt fields
);

// Hash and salt fields will be add by passportLocalMongoose plugin
userSchema.plugin(passportLocalMongoose);

export default model<IUser>("User", userSchema);
