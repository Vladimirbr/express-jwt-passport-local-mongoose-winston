import { Router, Request, Response, NextFunction } from 'express';

import container from '../configs/awilix';

const { auth, authValidator } = container.cradle;

const router = Router();

router.post('/register', authValidator.registerValidator, (req: Request, res: Response) => {
	auth.register(req, res);
});

router.post('/login', authValidator.loginValidator, (req: Request, res: Response, next: NextFunction) => {
	auth.login(req, res, next);
});

export default router;
