import express, { Request, Response } from "express";
import mongoose from "mongoose";
import passport from "passport";
import { PostsModel } from "../../models/PostsModel";
import { validatePost } from "../../validation/Post";
import { ProfileModel } from "../../models/ProfilesModel";

class Posts {
  private router: express.Router;
  constructor() {
    this.router = express.Router();
    this.testRoute();
    this.createPost();
    this.getPosts();
    this.getPostsById();
    this.deletePostsById();
    this.likePosts();
    this.unLikePosts();
    this.addComment();
    this.deleteComment();
  }

  // @route    GET api/posts/test
  // @desc     Tests post route
  // access    Private
  private testRoute() {
    this.router.get("/test", (req: Request, res: Response) => {
      res.json({ msg: "Posts Works" });
    });
  }

  // @route   POST  api/posts
  // @desc     Create post
  // access    Private

  private createPost() {
    this.router.post(
      "/",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        const { errors, isValid } = validatePost(req.body);

        if (!isValid) {
          return res.status(400).json(errors);
        }
        const newPost = new PostsModel({
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        });

        newPost.save().then(post => res.json(post));
      }
    );
  }

  // @route     GET  api/posts
  // @desc     Get posts
  // access    Public
  private getPosts() {
    this.router.get("/", (req: Request, res: Response) => {
      PostsModel.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
    });
  }

  // @route     GET  api/posts/:id
  // @desc      Get posts by id
  // access     Public
  private getPostsById() {
    this.router.get("/:id", (req: Request, res: Response) => {
      PostsModel.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err =>
          res.status(404).json({ nopostfound: "No post found with that ID" })
        );
    });
  }

  // @route     DELETE  api/posts/:id
  // @desc      Delete posts by id
  // access     Public
  private deletePostsById() {
    this.router.delete(
      "/:id",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        ProfileModel.findOne({ user: req.user.id }).then(profile => {
          PostsModel.findById(req.params.id)
            .then(post => {
              if (post != null) {
                if (post.user.toString() !== req.user.id) {
                  return res
                    .status(401)
                    .json({ notauthorized: "User not authorized" });
                }

                post.remove().then(() => res.json({ success: true }));
              }
            })
            .catch(err =>
              res.status(404).json({ postnotfound: "No post found" })
            );
        });
      }
    );
  }

  // @route     POST api/posts/like/:id
  // @desc      Like post
  // access     Private
  private likePosts() {
    this.router.post(
      "/like/:id",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        ProfileModel.findOne({ user: req.user.id }).then(profile => {
          PostsModel.findById(req.params.id)
            .then(post => {
              if (post != null) {
                if (
                  post.likes.filter(
                    like => like.user.toString() === req.user.id
                  ).length > 0
                ) {
                  return res
                    .status(400)
                    .json({ alreadyliked: "User already liked this post" });
                }

                // Add user id to likes array
                post.likes.unshift({ user: req.user.id });
                post.save().then(post => res.json(post));
              }
            })
            .catch(err =>
              res.status(404).json({ postnotfound: "No post found" })
            );
        });
      }
    );
  }

  // @route     POST api/posts/like/:id
  // @desc      unLike from post
  // access     Private
  private unLikePosts() {
    this.router.post(
      "/unlike/:id",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        ProfileModel.findOne({ user: req.user.id }).then(profile => {
          PostsModel.findById(req.params.id)
            .then(post => {
              if (post != null) {
                if (
                  post.likes.filter(
                    like => like.user.toString() === req.user.id
                  ).length === 0
                ) {
                  return res
                    .status(400)
                    .json({ notliked: "You've not yet like this post" });
                }

                // Get remove index
                const removeIndex = post.likes
                  .map(item => item.user.toString())
                  .indexOf(req.user.id);

                // Splice out of array
                post.likes.splice(removeIndex, 1);

                // Save
                post.save().then(post => res.json(post));
              }
            })
            .catch(err =>
              res.status(404).json({ postnotfound: "No post found" })
            );
        });
      }
    );
  }

  // @route     POST api/posts/comment/:id
  // @desc      Add comment to post
  // access     Private
  private addComment() {
    this.router.post(
      "/comment/:id",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        const { errors, isValid } = validatePost(req.body);

        if (!isValid) {
          return res.status(400).json(errors);
        }

        PostsModel.findById(req.params.id)
          .then(post => {
            if (post != null) {
              const newComment = {
                id: req.body.id,
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
              };

              // Add to comments array
              post.comments.unshift(newComment);

              // Save
              post.save().then(post => res.json(post));
            }
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      }
    );
  }

  // @route     DELETE api/posts/comment/:id/:comment_id
  // @desc      Delete comment from post
  // access     Private
  private deleteComment() {
    this.router.delete(
      "/comment/:id/:comment_id",
      passport.authenticate("jwt", { session: false }),
      (req: Request, res: Response) => {
        PostsModel.findById(req.params.id)
          .then(post => {
            if (post != null) {
              if (
                post.comments.filter(
                  comment => comment.id.toString() === req.params.comment_id
                ).length === 0
              ) {
                return res
                  .status(404)
                  .json({ commentnotexists: "Comment does not exits" });
              }

              // Get remove index
              const removeIndex = post.comments
                .map(item => item.id.toString())
                .indexOf(req.params.comment_id);

              // Splice comment out of array
              post.comments.splice(removeIndex, 1);

              // Save
              post.save().then(post => res.json(post));
            }
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      }
    );
  }
  get PostsRoutes() {
    return this.router;
  }
}

export default new Posts().PostsRoutes;
