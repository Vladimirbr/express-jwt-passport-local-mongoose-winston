import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import container from "../configs/awilix";

const jwtConfig = container.cradle.jwtConfig;

export const generateToken = (req: any, res: Response, next: NextFunction): void => {
  req.token = req.token || {};
  req.token = jwt.sign(
    {
      id: req.user.id,
      username: req.user.username,
    },
    jwtConfig.JWT_SECRET,
    {
      expiresIn: jwtConfig.JWT_TOKEN_TIME,
    }
  );
  next();
};

export const respond = (req: any, res: Response): void => {
  res.status(200).json({
    user: req.user.username,
    token: req.token,
  });
};
