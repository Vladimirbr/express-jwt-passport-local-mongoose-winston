//Defining a custom logger
import { createLogger, format, transports } from "winston";
const { combine, splat, timestamp, printf, label, json, prettyPrint, colorize } = format;

import { ILog } from "../../interfaces/log";

class Logger implements ILog {
  private logger;

  constructor({ loggerConfig }: { loggerConfig: { [key: string]: any } }) {
    this.logger = createLogger({
      level: <string>loggerConfig.MIN_LEVEL_CONSOLE,
      exitOnError: <boolean>loggerConfig.EXIT_ON_ERROR,
      handleExceptions: <boolean>loggerConfig.HANDLE_EXCEPTIONS,
      format: combine(
        label({ label: <string>loggerConfig.LABEL }),
        splat(),
        prettyPrint(),
        json(),
        format.simple(),
        timestamp({
          format: <string>loggerConfig.TIMESTAMP_FORMAT,
        }),
        this.myFormat
      ),
      transports: [
        new transports.Console({ format: colorize() }),
        // new transports.File({
        //     filename: path.join(FILES_FOLDER_PATH, "combined.log"),
        //     level: "info",
        // }),
        // new transports.File({
        //     filename: path.join(FILES_FOLDER_PATH, "errors.log"),
        //     level: "error",
        // }),
      ],
    });
  }

  public debug(msg: string, ...data: any[]): void {
    this.emitLofMessage("debug", msg, data);
  }

  public error(msg: string, ...data: any[]): void {
    this.emitLofMessage("error", msg, data);
  }

  public http(msg: string, ...data: any[]): void {
    this.emitLofMessage("http", msg, data);
  }

  public info(msg: string, ...data: any[]): void {
    this.emitLofMessage("info", msg, data);
  }

  public silly(msg: string, ...data: any[]): void {
    this.emitLofMessage("silly", msg, data);
  }

  public verbose(msg: string, ...data: any[]): void {
    this.emitLofMessage("verbose", msg, data);
  }

  public warn(msg: string, ...data: any[]): void {
    this.emitLofMessage("warn", msg, data);
  }

  private emitLofMessage(msgType: string, msg: string, data: any[]) {
    this.logger.log(msgType, msg, data);
  }

  private myFormat = printf(({ level, message, label, timestamp, ...metadata }): string => {
    let msg = `${timestamp} [${label}] - [${level}] : ${message} `;
    if (metadata && Object.keys(metadata).length !== 0) {
      msg += JSON.stringify(metadata);
    }
    return msg;
  });
}

export default Logger;
