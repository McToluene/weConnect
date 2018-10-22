import mongoose from "mongoose";
import { IPost } from "./IPost";

// Create Schema
const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UsersModel"
  },

  text: {
    type: String,
    required: true
  },

  name: {
    type: String
  },

  avatar: {
    type: String
  },

  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UsersModel"
      }
    }
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UsersModel"
      },

      text: {
        type: String,
        required: true
      },

      name: {
        type: String
      },

      avatar: {
        type: String
      },

      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

export const PostsModel = mongoose.model<IPost>("PostsModel", PostSchema);
