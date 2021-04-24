import { celebrate, Joi, Segments } from 'celebrate';

export default class AuthValidator {
	constructor() {}

	public loginValidator = celebrate({
		[Segments.BODY]: Joi.object()
			.keys({
				username: Joi.string().required().min(3).max(60),
				password: Joi.string().required().min(8).max(30),
			})
			.required(),
	});

	public registerValidator = celebrate({
		[Segments.BODY]: Joi.object()
			.keys({
				username: Joi.string().required().min(3).max(60),
				password: Joi.string().required().min(8).max(30),
			})
			.required(),
	});
}
