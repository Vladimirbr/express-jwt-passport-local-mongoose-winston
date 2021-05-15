import User from '../models/user';

export default class Queries {
	public authenticateUser() {
		return User.authenticate();
	}

	public serializeUser() {
		return User.serializeUser();
	}

	public deserializeUser() {
		return User.deserializeUser();
	}

	public async findById(id: string) {
		return await User.findById(id);
	}

	public async register(username: string, password: string) {
		return await User.register(new User({ username }), password);
	}
}
