import express from "express";
import { Request, Response } from "express";
import path from "path";
import mongoose from "mongoose";
import { Keys } from "./config/Keys";
import UsersRoutes from "./routes/api/Users";
import ProfilesRoutes from "./routes/api/Profile";
import PostsRoutes from "./routes/api/Posts";
import bodyParser from "body-parser";
import passport from "passport";
import { Passport } from "./config/Passport";

class App {
  private _app: express.Application;
  constructor() {
    this._app = express();
    this.middleware();
    this.connectToDb();
    this.homeDirectory();
    this.useRoutes();
  }

  private middleware() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    //Passport
    this.app.use(passport.initialize());
    Passport(passport);
  }
  private connectToDb() {
    const db = Keys.mongoURI;
    mongoose
      .connect(
        db,
        { useNewUrlParser: true }
      )
      .then(() => console.log("MongoDB Connected"))
      .catch(err => {
        console.log(err);
      });
  }

  get app() {
    return this._app;
  }

  homeDirectory() {
    if (process.env.NODE_ENV === "production") {
      this.app.use(express.static("client/build"));

      this.app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      });
    }
  }

  private useRoutes() {
    this.app.use("/api/users", UsersRoutes);
    this.app.use("/api/profile", ProfilesRoutes);
    this.app.use("/api/posts", PostsRoutes);
  }
}

export default new App().app;
