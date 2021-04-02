import { createContainer, asClass, asValue, asFunction, InjectionMode } from "awilix";

import { nodeConfig, mongoConfig, serverConfig, loggerConfig, jwtConfig } from "./config";

import Auth from "../controllers/auth";
//import app from "../app";
import Logger from "../shared/logger/logger";

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
  // app: asFunction(app).singleton(),
  logger: asClass(Logger).singleton(),
  auth: asClass(Auth),
});

export default container;
