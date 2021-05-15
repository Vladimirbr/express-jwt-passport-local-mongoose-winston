import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Request, Response } from 'express';

import { ILog } from '../interfaces/log';

export default class Auth {
	private logger;
	private jwtConfig;
	private queries;

	constructor({ jwtConfig, queries, logger }: { jwtConfig: { [key: string]: any }; queries: any; logger: ILog }) {
		this.logger = logger;
		this.jwtConfig = jwtConfig;
		this.queries = queries;
	}

	register = async (req: Request, res: Response) => {
		try {
			const resp = await this.queries.register(req.body.username, req.body.password);

			if (resp.errors) return res.status(500).json({ message: 'User registration error' });

			await passport.authenticate('local', {
				session: false,
			});
			//resp.toObject() for user entity
			res.status(200).json({ message: 'User registrated successfully' });
		} catch (err) {
			res.status(500).json({ message: 'User registration failed: ' + err });
		}
	};

	login = async (req: Request, res: Response) => {
		try {
			passport.authenticate('local', { session: false }, (err, user) => {
				if (err || !user) {
					return res.status(400).json({
						message: 'Something wrong with authentication',
						user: user,
					});
				}
				req.login(user, { session: false }, (loginError) => {
					if (loginError) res.send(loginError);

					// generate a signed json web token with the contents of user object and return it in the response
					const token = jwt.sign({ id: <string>user.id, username: <string>user.username }, <string>this.jwtConfig.JWT_SECRET);

					return res.json({ user: <string>user.username, token, expiresIn: this.jwtConfig.JWT_TOKEN_TIME, id: <string>user.id });
				});
			})(req, res);
		} catch (err) {
			this.logger.error('[auth.controller] - Login Error', err);
			throw Error('Login Error');
		}
	};
}
