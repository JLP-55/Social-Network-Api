const User = require("../models");

module.exports = {
	async getUsers(rq, rs) {
		try {
			const user = await User.find();
			rs.json(user);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	}
};