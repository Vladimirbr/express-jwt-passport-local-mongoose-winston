import mongoose from 'mongoose';

import container from '../configs/awilix';

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const mongoConfig = container.cradle.mongoConfig;
const logger = container.cradle.logger;

// Create the database connection
export const connectToDb = async (): Promise<void> => {
	try {
		await mongoose.connect(mongoConfig.MONGO_URI, {
			useNewUrlParser: mongoConfig.USE_NEW_URL_PARSER,
			useUnifiedTopology: mongoConfig.USE_UNIFIED_TOPOLOGY,
			useCreateIndex: mongoConfig.USE_CREATE_INDEX,
			poolSize: +mongoConfig.MONGO_POOL_SIZE,
		});
	} catch (err) {
		logger.error('[DB connector] - Mongoose create the database connection error %s', err);
		throw Error('Mongoose create the database connection error');
	}
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
	logger.info('[DB connector] - Mongoose default connection open to %s', mongoConfig.MONGO_URI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
	logger.error('[DB connector] - Mongoose default connection error: %s', err);
});

//When mongoose reconnected
mongoose.connection.on('reconnected', () => {
	logger.warn('[DB connector] - Mongoose Connection Reestablished');
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
	logger.info('[DB connector] - Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		logger.warn('[DB connector] - Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});
