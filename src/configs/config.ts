import * as env from "env-var";

export const nodeConfig = {
  NODE_ENV: env.get("NODE_ENV").required().default("development").example("development").asString(),
};

export const serverConfig = {
  PORT: env.get("PORT").required().default("3000").example("3000").asPortNumber(),
  HOST: env.get("HOST").required().default("localhost").example("localhost").asString(),
  BODY_JSON_LIMIT: env.get("BODY_JSON_LIMIT").required().default("5mb").example("5mb").asString(),
  URL_LIMIT: env.get("URL_LIMIT").required().default("1mb").example("1mb").asString(),
  URL_PARAMETER_LIMIT: env.get("URL_PARAMETER_LIMIT").required().default("100").example("100").asIntPositive(),
  URL_EXTENDED: env.get("URL_EXTENDED").required().default("false").example("false").asBool(),
};

export const mongoConfig = {
  MONGO_URI: env
    .get("MONGO_URI")
    .required()
    .default("mongodb://localhost:27017/auth")
    .example("mongodb://localhost:27017/auth")
    .asUrlString(),
  MONGO_POOL_SIZE: env.get("MONGO_POOL_SIZE").required().default("3").example("3").asIntPositive(),
  USE_NEW_URL_PARSER: env.get("USE_NEW_URL_PARSER").required().default("true").example("true").asBool(),
  USE_UNIFIED_TOPOLOGY: env.get("USE_UNIFIED_TOPOLOGY").required().default("true").example("true").asBool(),
  USE_CREATE_INDEX: env.get("USE_CREATE_INDEX").required().default("true").example("true").asBool(),
};

export const jwtConfig = {
  JWT_SECRET: env.get("JWT_SECRET").required().default("ILoveMyAuthServer").example("ILoveMyAuthServer").asString(),
  JWT_TOKEN_TIME: env.get("JWT_TOKEN_TIME").required().default("2592000").example("2592000").asIntPositive(), // 30 days;
};

export const loggerConfig = {
  MIN_LEVEL_CONSOLE: env.get("MIN_LEVEL_CONSOLE").required().default("debug").example("debug").asString(),
  MIN_LEVEL_FILE_COMBINED: env.get("MIN_LEVEL_FILE_COMBINED").required().default("info").example("info").asString(),
  MIN_LEVEL_FILE_ERROR: env.get("MIN_LEVEL_FILE_ERROR").required().default("error").example("error").asString(),
  LABEL: env.get("LABEL").required().default("auth_logger").example("auth_logger").asString(),
  EXIT_ON_ERROR: env.get("EXIT_ON_ERROR").required().default("false").example("false").asBool(),
  HANDLE_EXCEPTIONS: env.get("HANDLE_EXCEPTIONS").required().default("true").example("true").asBool(),
  TIMESTAMP_FORMAT: env.get("TIMESTAMP_FORMAT").required().default("YYYY-MM-DD HH:mm:ss").example("YYYY-MM-DD HH:mm:ss").asString(),
  FILES_FOLDER_PATH: env.get("FILES_FOLDER_PATH").required().default("C:/Code/playtests").example("C:/Code/playtests").asString(),
};
