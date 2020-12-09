const { Router } = require("express");

const Auth = require("../controllers/auth");

const router = new Router();

router.post("/register", (req, res) => {
  Auth.register(req, res);
});

router.post("/login", (req, res, next) => {
  Auth.login(req, res, next);
});

module.exports = router;
