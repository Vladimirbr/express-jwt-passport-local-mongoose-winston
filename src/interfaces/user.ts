import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  _id: ObjectId;
  salt: string;
  hash: number;
  createdAt: Date;
  updatedAt: Date;
}
