// ensure to specify the exact path to the model of you are destructuring {User, Thought}
const Thought = require("../models/thoughtModel.js");

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
