import jwt from "jsonwebtoken";
import passport from "passport";
import { Request, Response, NextFunction } from "express";

import User from "../models/user";

import { ILog } from "../interfaces/log";
export default class Auth {
  private logger;
  private jwtConfig;

  constructor({ jwtConfig, logger }: { jwtConfig: any; logger: ILog }) {
    this.logger = logger;
    this.jwtConfig = jwtConfig;
  }

  register = async (req: Request, res: Response) => {
    try {
      User.register(
        new User({
          username: req.body.username,
        }),
        req.body.password,
        (registrationError: Error, user: any) => {
          if (registrationError) return res.status(500).json({ message: "User registration error" });

          passport.authenticate("local", {
            session: false,
          })(req, res, () => {
            res.status(200).json({ message: "User registrated successfully" });
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ message: "User registration failed: " + err });
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.username || !req.body.password) {
        return res.status(400).json({
          message: "Username or password is not correct",
        });
      }
      passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            message: "Something wrong with authentication",
            user: user,
          });
        }
        req.login(user, { session: false }, (loginError) => {
          if (loginError) res.send(loginError);

          // generate a signed json web token with the contents of user object and return it in the response
          const token = jwt.sign({ id: user.id, username: user.username }, this.jwtConfig.JWT_SECRET);

          return res.json({ user: user.username, token, expiresIn: this.jwtConfig.JWT_TOKEN_TIME, id: user.id });
        });
      })(req, res);
    } catch (err) {
      this.logger.error("[auth.controller] - Login Error", err);
      throw Error("Login Error");
    }
  };
}

//const auth = new Auth();
//export default auth;
