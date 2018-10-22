import express, { Request, Response } from "express";
import passport from "passport";
import { ProfileModel } from "../../models/ProfilesModel";
import { UserModel } from "../../models/UsersModel";
import { profiles, social } from "./Profile.Type";
import { validateProfile } from "../../validation/Profile";
import { validateExperience } from "../../validation/Experience";
import { validateEducation } from "../../validation/Education";

class Profiles {
  private router: express.Router;
  constructor() {
    this.router = express.Router();
    this.testRoute();
    this.currentUser();
    this.createUser();
    this.getByHandle();
    this.getByID();
    this.getAll();
    this.addExperience();
    this.addEducation();
    this.deleteExperience();
    this.deleteEducation();
    this.deleteUserAndProfile();
  }

  // @route    GET api/profile/test
  // @desc     Tests profile route
  // access    Public
  private testRoute() {
    this.router.get("/test", (req: Request, res: Response) => {
      res.json({ msg: "Profile Works" });
    });
  }

  // @route    GET api/profile
  // @desc     Get current user profile
  // access    Private
  private currentUser() {
    this.router.get(
      "/",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        type error = {
          noprofile: string;
        };
        const errors = {} as error;
        ProfileModel.findOne({ user: req.user.id })
          .populate("user", ["name", "avatar"])
          .then(profile => {
            if (!profile) {
              errors.noprofile = "There is no profile";
              return res.status(404).json(errors);
            }
            res.json(profile);
          })
          .catch(err => res.status(404).json(err));
      }
    );
  }

  // @route    POST api/profile
  // @desc     Create  or Edit user profile
  // access    Private
  private createUser() {
    this.router.post(
      "/",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        const { errors, isValid } = validateProfile(req.body);
        if (!isValid) {
          return res.status(400).json(errors);
        }

        // Get fields
        const profileFields = {} as profiles;
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.githubusername)
          profileFields.githubusername = req.body.githubusername;

        //Skills --split into array
        if (typeof req.body.skills !== undefined) {
          profileFields.skills = req.body.skills.split(",");
        }

        //Social
        profileFields.social = {} as social;
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook)
          profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin)
          profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram)
          profileFields.social.instagram = req.body.instagram;

        ProfileModel.findOne({ user: req.user.id }).then(profile => {
          if (profile) {
            // Update
            console.log(profile);
            ProfileModel.findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true }
            ).then(profile => res.json(profile));
          } else {
            // Create

            // Check if handle exists
            ProfileModel.findOne({ handle: profileFields.handle })
              .then(profile => {
                if (profile) {
                  errors.handle = "That handle already exists";
                  res.status(400).json(errors);
                }

                // Save profile
                new ProfileModel(profileFields)
                  .save()
                  .then(profile => res.json(profile));
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      }
    );
  }

  // @route    GET api/profile/all
  // @desc     Get all profiles
  // access    Public
  private getAll() {
    this.router.get("/all", (req: Request, res: Response) => {
      type errors = {
        noprofile: string;
      };
      let error = {} as errors;
      ProfileModel.find()
        .populate("user", ["name", "avatar"])
        .then(profiles => {
          if (!profiles) {
            error.noprofile = "There are no profiles";
            return res.status(404).json(error);
          }

          res.json(profiles);
        })
        .catch(err =>
          res.status(404).json({ profile: "There are no profiles" })
        );
    });
  }

  // @route    GET api/profile/handle/:handle
  // @desc     Get profile by handle
  // access    Publie
  private getByHandle() {
    this.router.get("/handle/:handle", (req: Request, res: Response) => {
      type errors = {
        noprofile: string;
      };
      let error = {} as errors;
      ProfileModel.findOne({ handle: req.params.handle })
        .populate("user", ["name", "avatar"])
        .then(profile => {
          if (!profile) {
            error.noprofile = "There is no profile for this user";
            return res.status(404).json(error);
          }
          
          res.json(profile);
        })
        .catch(err => res.status(404).json(err));
    });
  }

  // @route    GET api/profile/user/:user_id
  // @desc     Get profile by user ID
  // access    Publie
  private getByID() {
    this.router.get("/user/:user_id", (req: Request, res: Response) => {
      type errors = {
        noprofile: string;
      };
      let error = {} as errors;
      ProfileModel.findOne({ user: req.params.user_id })
        .populate("user", ["name", "avatar"])
        .then(profile => {
          if (!profile) {
            error.noprofile = "There is no profile for this user";
            res.status(404).json(error);
          }

          res.json(profile);
        })
        .catch(err =>
          res.status(404).json({ profile: "There is no profile for this user" })
        );
    });
  }

  // @route    POST api/profile/experience
  // @desc     Add experience to profiles
  // access    Private
  private addExperience() {
    this.router.post(
      "/experience",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        const { errors, isValid } = validateExperience(req.body);

        if (!isValid) {
          return res.status(400).json(errors);
        }
        ProfileModel.findOne({ user: req.user.id }).then(profile => {
          const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          };

          //Add
          if (profile != null) {
            profile.experience.unshift(newExp);
            profile.save().then(profile => res.json(profile));
          }
        });
      }
    );
  }

  // @route    POST api/profile/eductation
  // @desc     Add education to profiles
  // access    Private
  private addEducation() {
    this.router.post(
      "/education",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        const { errors, isValid } = validateEducation(req.body);

        if (!isValid) {
          return res.status(400).json(errors);
        }
        ProfileModel.findOne({ user: req.user.id }).then(profile => {
          const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          };

          //Add
          if (profile != null) {
            profile.education.unshift(newEdu);
            profile.save().then(profile => res.json(profile));
          }
        });
      }
    );
  }

  // @route    DELETE api/profile/experience/:exp_id
  // @desc     Delete experience from profiles
  // access    Private
  private deleteExperience() {
    this.router.delete(
      "/experience/:exp_id",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        ProfileModel.findOne({ user: req.user.id })
          .then(profile => {
            if (profile) {
              const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id);

              // Splice out of array
              profile.experience.splice(removeIndex, 1);

              // save
              profile.save().then(profile => res.json(profile));
            }
          })
          .catch(err => res.status(404).json(err));
      }
    );
  }

  // @route    DELETE api/profile/experience/:edu_id
  // @desc     Delete education from profiles
  // access    Private
  private deleteEducation() {
    this.router.delete(
      "/education/:edu_id",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        ProfileModel.findOne({ user: req.user.id })
          .then(profile => {
            if (profile) {
              const removeIndex = profile.education
                .map(item => item.id)
                .indexOf(req.params.edu_id);

              // Splice out of array
              profile.education.splice(removeIndex, 1);

              // save
              profile.save().then(profile => res.json(profile));
            }
          })
          .catch(err => res.status(404).json(err));
      }
    );
  }

  // @route    DELETE api/profile/
  // @desc     Delete user and profile
  // access    Private
  private deleteUserAndProfile() {
    this.router.delete(
      "/",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        ProfileModel.findOneAndRemove({ user: req.user.id }).then(() => {
          UserModel.findOneAndRemove({ _id: req.user.id }).then(() =>
            res.json({ success: true })
          );
        });
      }
    );
  }

  get ProfileRoutes() {
    return this.router;
  }
}

export default new Profiles().ProfileRoutes;
