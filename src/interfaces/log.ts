/**
 * Logger interface
 */
export interface ILog {
	error(msg: string, ...data: any[]): void;
	warn(msg: string, ...data: any[]): void;
	info(msg: string, ...data: any[]): void;
	http(msg: string, ...data: any[]): void;
	verbose(msg: string, ...data: any[]): void;
	debug(msg: string, ...data: any[]): void;
	silly(msg: string, ...data: any[]): void;
}
