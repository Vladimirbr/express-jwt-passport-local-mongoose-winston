const path = require("path");

//Defining a custom logger
const { createLogger, format, transports } = require("winston");
const { combine, splat, timestamp, printf, label, json, prettyPrint, colorize } = format;

const loggerFolder = require("../configs/config").logger.folder;

// Defining logger custom message format
const myFormat = printf(({ level, message, label, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${label}] - [${level}] : ${message} `;
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
  handleRejections: true,
  format: combine(
    label({ label: "server_log" }),
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
      filename: path.join(loggerFolder, "combined.log"),
      level: "info",
    }),
    new transports.File({
      filename: path.join(loggerFolder, "errors.log"),
      level: "error",
    }),
  ],
});

module.exports = logger;
