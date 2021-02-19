import passportJWT from "passport-jwt";
const LocalStrategy = require("passport-local").Strategy;

import { JWT_SECRET } from "../configs/env";
import User from "../models/user";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = (passport: {
  use: (arg0: passportJWT.Strategy) => void;
  serializeUser: (arg0: any) => void;
  deserializeUser: (arg0: any) => void;
}) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      User.authenticate()
    )
  );
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
      },
      async (jwtPayload, callback) => {
        //Find the user data in db.
        try {
          const user = await User.findById(jwtPayload.id);

          return callback(null, user);
        } catch (findUserError) {
          return callback(findUserError);
        }
      }
    )
  );
};
