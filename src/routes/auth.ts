import { Router, Request, Response, NextFunction } from 'express';

import container from '../configs/awilix';

const { auth, authValidator } = container.cradle;

const router = Router();

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
