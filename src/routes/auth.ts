import { Router, Request, Response, NextFunction } from 'express';

import container from '../configs/awilix';

const auth = <typeof container.cradle.auth>container.cradle.auth;

const router = Router();

router.post('/register', (req: Request, res: Response) => {
	auth.register(req, res);
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
	auth.login(req, res, next);
});

export default router;
