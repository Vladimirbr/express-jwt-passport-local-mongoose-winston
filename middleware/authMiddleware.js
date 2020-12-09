const jwt = require("jsonwebtoken");

const jwtConf = require("../configs/config").jwt;

exports.generateToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign(
    {
      id: req.user.id,
      username: req.user.username,
    },
    jwtConf.secret,
    {
      expiresIn: jwtConf.tokenTime,
    }
  );
  next();
};

exports.respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token,
  });
};
