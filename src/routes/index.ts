import { Router, Request, Response } from "express";

const router = Router();

/* GET index page. */
router.get("/", (req: Request, res: Response) => {
  res.json({
    title: "Express",
  });
});

export default router;
