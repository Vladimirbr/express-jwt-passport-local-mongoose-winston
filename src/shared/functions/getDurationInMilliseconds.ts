/**
 * Calculate duration in ms between given time in param start and process.hrtime
 *
 *  **Warning: function doesn't check if start param is correct
 *
 * @category shared_function
 *
 *
 * Basic usage example:
 *
 * ```ts
 * import { getDurationInMilliseconds } from './shared/functions';
 * const start = process.hrtime();
 * const durationInMilliseconds = getDurationInMilliseconds(start);
 * ```
 *
 * @param start the current high-resolution real time in a [seconds, nanoseconds] tuple Array, where nanoseconds is the remaining part of the real time that can't be represented in second precision
 *
 * @return Time (number) in ms between start and current hrtime, for example 54,23 (ms), returned only the number
 */
export default (start: [number, number]): number => {
	const NS_PER_SEC = 1e9;
	const NS_TO_MS = 1e6;
	const diff = process.hrtime(start);

	return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
