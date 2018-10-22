import { Document } from "mongoose";

export interface IPost extends Document {
  user: string;
  text: string;
  name: string;
  avatar: string;
  likes: user[];
  comments: comment[];
}

type user = {
  user: string;
};

type comment = {
  id: string;
  text: string;
  name: string;
  avatar: string;
  user: string;
};
