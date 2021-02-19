import path from "path";

//Defining a custom logger
import { createLogger, format, transports } from "winston";
const { combine, splat, timestamp, printf, label, json, prettyPrint, colorize } = format;

import { WINSTON_LOGGER_FOLDER } from "../configs/env";
// Defining logger custom message format
const myFormat = printf(({ level, message, label, timestamp, ...metadata }) => {
  let msg: string = `${timestamp} [${label}] - [${level}] : ${message} `;
  if (metadata && Object.keys(metadata).length !== 0) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

//Create loggers
const logger = createLogger({
  level: "debug",
  exitOnError: false,
  handleExceptions: true,
  //handleRejections: true,
  format: combine(
    label({ label: "auth_log" }),
    splat(),
    prettyPrint(),
    json(),
    format.simple(),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    myFormat
  ),
  transports: [
    new transports.Console({ format: colorize() }),
    new transports.File({
      filename: path.join(WINSTON_LOGGER_FOLDER, "combined.log"),
      level: "info",
    }),
    new transports.File({
      filename: path.join(WINSTON_LOGGER_FOLDER, "errors.log"),
      level: "error",
    }),
  ],
});

export default logger;
