import { Document } from "mongoose";

export interface IProfile extends Document {
  user: string;
  handle: string;
  website: string;
  company: string;
  location: string;
  bio: string;
  status: string;
  githubusername: string;
  skills: string;
  social: social;
  experience: experience[];
  education: education[];
}

type social = {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
};

type experience = {
  id?: string;
  title: string;
  company: string;
  location?: string;
  from: string;
  to?: string;
  current?: string;
  description?: string;
};

type education = {
  id?: string;
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to?: string;
  current?: string;
  description?: string;
};
