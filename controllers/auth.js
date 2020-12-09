const jwt = require("jsonwebtoken");
const passport = require("passport");

const logger = require("../logger/logger");
const User = require("../models/user");
const secretOrKey = require("../configs/config").jwt.secret;

class Auth {
  register = async (req, res) => {
    try {
      User.register(
        new User({
          username: req.body.username,
        }),
        req.body.password,
        (registrateError, user) => {
          if (registrateError) return res.status(500).send("User registration error", registrateError);

          passport.authenticate("local", {
            session: false,
          })(req, res, () => {
            res.status(200).send("User registrated successfully");
          });
        }
      );
    } catch (err) {
      return res.status(500).send("User registration failed: " + err);
    }
  };

  login = async (req, res, next) => {
    try {
      if (!req.body.username || !req.body.password) {
        return res.status(400).json({
          message: "Username or password is not correct",
        });
      }
      passport.authenticate("local", { session: false }, (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            message: "Something wrong with authentication",
            user: user,
          });
        }
        req.login(user, { session: false }, (loginError) => {
          if (loginError) res.send(loginError);

          // generate a signed json web token with the contents of user object and return it in the response
          const token = jwt.sign({ id: user.id, username: user.username }, secretOrKey);

          return res.json({ user: user.username, token });
        });
      })(req, res);
    } catch (err) {
      logger.log("error", "[auth.controller] - Login Error", err);
    }
  };
}

module.exports = new Auth();
