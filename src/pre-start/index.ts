/**
 * Pre-start is where we want to place things that must run BEFORE the express server is started.
 */

import { connectToDb } from "../db/connect";

import logger from "../logger/logger";

export const preStart = async (): Promise<any> => {
  // Connect to mongo db
  await connectToDb();
  logger.log("info", "[pre-start] - Mongo db connected");
};
