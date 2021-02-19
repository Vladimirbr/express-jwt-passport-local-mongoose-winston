import { Router, Request, Response, NextFunction } from "express";

const router = Router();

/* GET users listing. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("not implemented yet");
});

/* GET user profile. */
router.get("/profile", (req: Request, res: Response, next: NextFunction) => {
  res.send(req.user);
});

export default router;
