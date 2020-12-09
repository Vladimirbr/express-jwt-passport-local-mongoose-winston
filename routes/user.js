const { Router } = require("express");

const router = Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("not implemented yet");
});

/* GET user profile. */
router.get("/profile", (req, res, next) => {
  res.send(req.user);
});

module.exports = router;
