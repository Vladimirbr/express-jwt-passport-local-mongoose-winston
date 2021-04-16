import { createContainer, asClass, asValue, InjectionMode } from 'awilix';

import { nodeConfig, mongoConfig, serverConfig, loggerConfig, jwtConfig } from './config';

import Auth from '../controllers/auth';
import Logger from '../shared/logger/logger';

const container = createContainer({
	injectionMode: InjectionMode.PROXY,
});

container.register({
	nodeConfig: asValue(nodeConfig),
	mongoConfig: asValue(mongoConfig),
	serverConfig: asValue(serverConfig),
	loggerConfig: asValue(loggerConfig),
	jwtConfig: asValue(jwtConfig),
});

container.register({
	logger: asClass(Logger).singleton(),
	auth: asClass(Auth),
});

export default container;
