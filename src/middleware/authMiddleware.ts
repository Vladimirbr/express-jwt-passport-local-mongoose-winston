import jwt from "jsonwebtoken";

import { JWT_SECRET, JWT_TOKEN_TIME } from "../configs/env";

export const generateToken = (req: any, res: any, next: any): void => {
  req.token = req.token || {};
  req.token = jwt.sign(
    {
      id: req.user.id,
      username: req.user.username,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_TOKEN_TIME,
    }
  );
  next();
};

export const respond = (req: any, res: any): void => {
  res.status(200).json({
    user: req.user.username,
    token: req.token,
  });
};
