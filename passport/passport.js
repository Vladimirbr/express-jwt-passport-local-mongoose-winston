const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;

const secretOrKey = require("../configs/config").jwt.secret;
const User = require("../models/user");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = (passport) => {
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
        secretOrKey: secretOrKey,
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
