/**
 * Module dependencies.
 */
import compression from 'compression';
import cors from 'cors';
import { errors } from 'celebrate';
import express, { Application, Request, Response, NextFunction, json, urlencoded } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import passport from 'passport';
import StatusCodes from 'http-status-codes';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// ---> Module for catching all async errors!!!
import 'express-async-errors';

import { getDurationInMilliseconds } from './shared/functions';
import container from './configs/awilix';
import { ILog } from './interfaces/log';
import passportStrategy from './passport/passport';

// Imports routes
import indexRouter from './routes/index';
import authRouter from './routes/auth';
import userRouter from './routes/user';

// Passport Config
passportStrategy(passport);

const { BAD_REQUEST } = StatusCodes;

class App {
	public app: Application;

	private logger: ILog;
	private serverConfig: typeof container.cradle.serverConfig;

	private swaggerSpec = swaggerJSDoc({
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'Cal Service',
				version: '1.0.0',
				description: 'Service that make jwt login and registration',
			},
		},
		apis: ['./src/routes/*.ts'],
	});

	constructor({ logger, serverConfig }: { logger: ILog; serverConfig: typeof container.cradle.serverConfig }) {
		this.logger = logger;
		this.serverConfig = serverConfig;

		this.app = express();

		this.initMiddlewares();
	}

	initMiddlewares(): void {
		// Using the logger and its configured transports, to save the logs created by Morgan and combined with Winston logger
		this.app.use(
			morgan('combined', {
				stream: {
					write: (text: string) => {
						this.logger.info(text);
					},
				},
			}),
		);

		//Calculate req res time
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			const start = process.hrtime();

			res.on('finish', () => {
				const durationInMilliseconds = getDurationInMilliseconds(start);
				this.logger.debug(
					`[App] - ${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms [HOST] ${
						req.hostname
					} [BODY] ${JSON.stringify(req.body)} [PARAMS]: ${JSON.stringify(req.params)} [QUERY] ${JSON.stringify(req.query)}`,
				);
			});

			res.on('close', () => {
				const durationInMilliseconds = getDurationInMilliseconds(start);
				this.logger.debug(
					`[App] - ${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms [HOST] ${
						req.hostname
					} [BODY] ${JSON.stringify(req.body)} [PARAMS]: ${JSON.stringify(req.params)} [QUERY] ${JSON.stringify(req.query)}`,
				);
			});

			next();
		});

		// Allows our other application to make HTTP requests to Express application
		this.app.use(cors());

		// Secure your Express apps by setting various HTTP headers
		this.app.use(helmet());
		// Protect against HTTP Parameter Pollution attacks
		this.app.use(hpp());

		// Compress responses
		this.app.use(compression());

		// Allow express parse req url and json body
		this.app.use(json({ limit: this.serverConfig.BODY_JSON_LIMIT }));
		this.app.use(
			urlencoded({
				extended: this.serverConfig.URL_EXTENDED,
				parameterLimit: this.serverConfig.URL_PARAMETER_LIMIT,
				limit: this.serverConfig.URL_LIMIT,
			}),
		);

		this.app.use(mongoSanitize());

		// This will initialize the passport object on every request
		this.app.use(passport.initialize());

		/**
		 * -------------- ROUTES ----------------
		 */
		this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerSpec, { explorer: true }));
		this.app.use('/', indexRouter);
		this.app.use('/api/v1/auth', authRouter);
		// Every req to user route must be authenticated by jwt
		this.app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);

		//Catch validation errors
		this.app.use(errors());

		//Error handler middleware
		this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
			this.logger.error(`[App] - Error Handler - ${err}`);
			return res.status(BAD_REQUEST).json({
				error: err.message,
			});
		});
	}
}

export default new App(container.cradle).app;
