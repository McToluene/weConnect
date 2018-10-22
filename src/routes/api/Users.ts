import express, { Request, Response } from "express";
import { UserModel } from "../../models/UsersModel";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import { IUser } from "../../models/IUser";
import jwt from "jsonwebtoken";
import { Keys } from "../../config/Keys";
import passport from "passport";
import { validateRegistration } from "../../validation/Register";
import { validateLogin } from "../../validation/Login";

class Users {
  private router: express.Router;
  constructor() {
    this.router = express.Router();
    this.testRoute();
    this.registerUser();
    this.loginUser();
    this.currentUser();
  }

  // @route    GET api/users/test
  // @desc     Tests users route
  // access    public
  private testRoute() {
    this.router.get("/test", (req: Request, res: Response) => {
      res.json({ msg: "Users Works" });
    });
  }

  // @route    GET api/users/registration
  // @desc     Register User
  // access    public
  private registerUser() {
    this.router.post("/register", (req: Request, res: Response) => {
      const { errors, isValid } = validateRegistration(req.body);

      // validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      UserModel.findOne({ email: req.body.email }).then(user => {
        if (user) {
          errors.email = "Email already exits";
          return res.status(400).json(errors);
        } else {
          const avatar = gravatar.url(req.body.email, {
            s: "200", // size
            r: "pg", // rating
            d: "mm" // default
          });

          const newUser: IUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password
          });

          bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      });
    });
  }

  // @route    GET api/users/login
  // @desc     Login User / Returning JWT Token
  // access    public
  private loginUser() {
    this.router.post("/login", (req: Request, res: Response) => {
      const { errors, isValid } = validateLogin(req.body);

      // validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const email = req.body.email;
      const password = req.body.password;

      UserModel.findOne({ email }).then(user => {
        if (!user) {
          errors.email = "User not found";
          return res.status(404).json(errors);
        }

        bcryptjs.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // create jwt payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }; //
            // Sign Token
            jwt.sign(
              payload,
              Keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            errors.password = "Password incorrect";
            return res.status(400).json(errors);
          }
        });
      });
    });
  }

  // @route    GET api/users/current
  // @desc     Return current user
  // access    private
  private currentUser() {
    this.router.get(
      "/current",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        res.json({
          id: req.user.id,
          name: req.user.name,
          email: req.user.email
        });
      }
    );
  }

  get UsersRoutes() {
    return this.router;
  }
}

export default new Users().UsersRoutes;
