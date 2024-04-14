// ensure to specify the exact path to the model of you are destructuring {User, Thought}
const Thought = require("../models/thoughtModel.js");
const User = require("../models/userModel.js");

module.exports = {
	async getThoughts(rq, rs) {
		try {
			const thought = await Thought.find();
			rs.json(thought);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	async createThoughts(rq, rs) {
		// will get an error when creating a new thought
		// cannot set headers after they are sent to the client
		try {
			const newThought = await Thought.create(rq.body);
			const user = await User.findOneAndUpdate(
				// filter the correct user to be updated
				{_id: rq.body.userId},
				// add a thought to the user using the _id of "newThought"
				{$addToSet: {thoughts: newThought._id}},
				// return the user
				{new: true}
			);

			!user 
				? rs.status(404).json({message: "no user with that id"})
				: rs.json(user);

			rs.json(newThought);
			console.log(newThought);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	}
};
