import passportJWT from "passport-jwt";
import { Strategy } from "passport-local";

import container from "../configs/awilix";
import User from "../models/user";

const jwtConfig = <typeof container.cradle.jwtConfig>container.cradle.jwtConfig;

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const passportStrategy = (passport: {
  use: (arg0: passportJWT.Strategy) => void;
  serializeUser: (arg0: any) => void;
  deserializeUser: (arg0: any) => void;
}) => {
  passport.use(
    new Strategy(
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
        jwtFromRequest: <passportJWT.JwtFromRequestFunction>ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: <string>jwtConfig.JWT_SECRET,
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

export default passportStrategy;
