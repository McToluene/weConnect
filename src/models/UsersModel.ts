import mongoose from "mongoose";
import { IUser } from "./IUser";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  avatar: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

export const UserModel = mongoose.model<IUser>("UsersModel", UserSchema);
