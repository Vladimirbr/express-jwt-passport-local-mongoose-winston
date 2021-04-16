import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @openapi
 * /:
 *  get:
 *    description: Welcome Express route
 *    tags: [Index]
 *    responses:
 *      200:
 *        description: Return Express Title message
 */
router.get('/', (req: Request, res: Response) => {
	res.json({
		title: 'Express',
	});
});

export default router;
