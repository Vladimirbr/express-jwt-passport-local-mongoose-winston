/**
 * Pre-start is where we want to place things that must run BEFORE the express server is started.
 */

import container from '../configs/awilix';
import { connectToDb } from '../db/connect';

const logger = container.cradle.logger;

export const preStart = async (): Promise<void> => {
	// Connect to mongo db
	await connectToDb();
	logger.info('[pre-start] - Mongo db connected');
};
