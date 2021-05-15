import passportJWT from 'passport-jwt';
import { Strategy } from 'passport-local';

import container from '../configs/awilix';

const { jwtConfig, queries } = container.cradle;

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const passportStrategy = (passport: {
	use: (arg0: passportJWT.Strategy) => void;
	serializeUser: (arg0: any) => void;
	deserializeUser: (arg0: any) => void;
}) => {
	passport.use(
		new Strategy(
			{
				usernameField: 'username',
				passwordField: 'password',
			},
			queries.authenticateUser(),
		),
	);
	passport.serializeUser(queries.serializeUser());
	passport.deserializeUser(queries.deserializeUser());
	passport.use(
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
				secretOrKey: <string>jwtConfig.JWT_SECRET,
			},
			async (jwtPayload, callback) => {
				//Find the user data in db.
				try {
					const user = await queries.findById(jwtPayload.id);

					return callback(null, user);
				} catch (findUserError) {
					return callback(findUserError);
				}
			},
		),
	);
};

export default passportStrategy;
