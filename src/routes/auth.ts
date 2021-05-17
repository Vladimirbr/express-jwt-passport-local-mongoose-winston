import { Router, Request, Response, NextFunction } from 'express';

import container from '../configs/awilix';

const { auth, authValidator } = container.cradle;

const router = Router();
//TODO auth login and verify token with middlewares verifyUserToken, IsUser
// TODO different routes  for auth and admin
//TODO jwt token with role, add role to mongoose schema too
/*
exports.IsUser = async (req, res, next) => {
    if (req.user.user_type_id === 0) {
        next();
    }
    return res.status(401).send("Unauthorized!");   
}
exports.IsAdmin = async (req, res, next) => {
    if (req.user.user_type_id === 1) {
        next();
    }
    return res.status(401).send("Unauthorized!");

}
export function verifyJWTToken(token) 
{
  return new Promise((resolve, reject) =>
  {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => 
    {
      if (err || !decodedToken)
      {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}
const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);
const { role } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }
	if (!token) {
        return res.sendStatus(401);
    }
	router.post("/", [auth_jwt_token.verifyToken], blog.create);
	const Role = mongoose.model(
      "Role",
      mongoose.Schema(
        {
          name: String,
        },
        { timestamps: true }
      ) 
    );
	const User = mongoose.model(
      "User",
      mongoose.Schema(
        {
          username: String,
          email: String,
          password: String,
          roles: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Role"
            }
          ]
        },
        { timestamps: true }
      )
    );
	  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {

      if (err) {
        res.status(500).send({ message: err });
        return

jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });

  isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};
function initialize() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });

        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
  https://dev.to/kevin_odongo35/jwt-authorization-and-authentication-node-express-and-vue-2p8c
  ---
  const Role = require('_helpers/role');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];
---
https://stackoverflow.com/questions/65090835/how-can-i-identify-if-user-is-admin-or-not-in-express
---
if (err.code === 'permission_denied') {
    res.status(403).send('Forbidden');
  }
*/
router.post('/register', authValidator.registerValidator, async (req: Request, res: Response) => {
	try {
		const result = await auth.register(req.body);

		res.status(200).json({ message: result });
	} catch (e) {
		res.status(500).json({ message: e });
	}
});

router.post('/login', authValidator.loginValidator, (req: Request, res: Response, next: NextFunction) => {
	auth.login(req, res, next);
});

export default router;
