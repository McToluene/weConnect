import { Strategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";
import { Keys } from "./Keys";
import { PassportStatic } from "passport";

const JwtStategy = Strategy;
const extractJwt = ExtractJwt;
const User = mongoose.model("UsersModel");
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Keys.secretOrKey
};

export const Passport = (passport: PassportStatic) => {
  passport.use(
    new JwtStategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }

          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
