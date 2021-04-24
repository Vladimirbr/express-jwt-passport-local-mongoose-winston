/**
 * Module dependencies.
 */
import { createLogger, format, transports } from 'winston';
const { combine, splat, timestamp, printf, label, json, prettyPrint, colorize } = format;

import { ILog } from '../../interfaces/log';

/**
 * @class Logger - representing a logger, implement log interface
 *
 * {@link ILog}
 *
 * @category logger
 */
class Logger implements ILog {
	/** The logger instance
	 * @category logger
	 */
	private logger;

	/**
	 * @constructor Create a logger
	 *
	 * @param loggerConfig - The logger configurations
	 *
	 * @category logger
	 */
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
				this.myFormat,
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

	/**
	 * Public function that print log in level debug
	 *
	 * @category logger
	 *
	 * @param msg - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public debug(msg: string, ...data: any[]): void {
		this.emitLofMessage('debug', msg, data);
	}

	/**
	 * Public function that print log in level error
	 *
	 * @category logger
	 *
	 * @param msg - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public error(msg: string, ...data: any[]): void {
		this.emitLofMessage('error', msg, data);
	}

	/**
	 * Public function that print log in level http
	 *
	 * @category logger
	 *
	 * @param msg - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public http(msg: string, ...data: any[]): void {
		this.emitLofMessage('http', msg, data);
	}

	/**
	 * Public function that print log in level info
	 *
	 * @category logger
	 *
	 * @param msg - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public info(msg: string, ...data: any[]): void {
		this.emitLofMessage('info', msg, data);
	}

	/**
	 * Public function that print log in level silly
	 *
	 * @category logger
	 *
	 * @param msg - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public silly(msg: string, ...data: any[]): void {
		this.emitLofMessage('silly', msg, data);
	}

	/**
	 * Public function that print log in level verbose
	 *
	 * @category logger
	 *
	 * @param msg - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public verbose(msg: string, ...data: any[]): void {
		this.emitLofMessage('verbose', msg, data);
	}

	/**
	 * Public function that print log in level warning
	 *
	 * @category logger
	 *
	 * @param msg - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public warn(msg: string, ...data: any[]): void {
		this.emitLofMessage('warn', msg, data);
	}

	/**
	 * Private function that log all data
	 *
	 * @category logger
	 *
	 * @param msgType - The logger level
	 * @param msg - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	private emitLofMessage(msgType: string, msg: string, data: any[]) {
		this.logger.log(msgType, msg, data);
	}

	/**
	 * Private function for formatting log message using winston printf method
	 *
	 * @category logger
	 *
	 * @return msg - The formatted log message
	 */
	private myFormat = printf(({ level, message, label, timestamp, ...metadata }): string => {
		let msg = `${timestamp} [${label}] - [${level}] : ${message} `;
		if (metadata && Object.keys(metadata).length !== 0) {
			msg += JSON.stringify(metadata);
		}
		return msg;
	});
}

export default Logger;
