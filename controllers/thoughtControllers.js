const Thought = require("../models");

module.exports = {
	async getThoughts(rq, rs) {
		try {
			const thought = await Thought.find();
			rs.json(thought);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	}
};
