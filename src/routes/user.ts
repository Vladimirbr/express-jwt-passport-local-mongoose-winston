import { Router, Request, Response } from 'express';

const router = Router();

/* GET users listing. */
router.get('/', (req: Request, res: Response) => {
	res.send('not implemented yet');
});

/* GET user profile. */
router.get('/profile', (req: Request, res: Response) => {
	res.send(req.user);
});

export default router;
