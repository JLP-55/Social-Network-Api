// ensure to specify the exact path to the model of you are destructuring {User, Thought}
const Thought = require("../models/thoughtModel.js");
const User = require("../models/userModel.js");

module.exports = {
	// get thoughts route works
	async getThoughts(rq, rs) {
		try {
			const thought = await Thought.find({});
			rs.json(thought);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	// getSingleThought route works
	async getSingleThought(rq, rs) {
		try {
			const thought = await Thought.findOne({_id: rq.params.userId});
			rs.json(thought);
			console.log(thought);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	// createThoughts route works
	async createThoughts(rq, rs) {
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

			rs.json(newThought);
			console.log(newThought);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	// updateThoughts route still needs work
	async updateThoughts(rq, rs) {
		try {
			const updateThoughts = await Thought.findOneAndUpdate(
				{_id: rq.body.userId},
				// we need to actually take some user input and update the given "rq.body.userId"
				// use "$addToSet"? Can't remember what this does.
			);
			!updateThoughts
			 	? rs.status(404).json({message: "no thought with that id"})
			 	: rs.status(200).json(updateThoughts);
			// console.log(updateThoughts);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	// deleteThoughts route is incomplete
	async deleteThoughts(rq, rs) {
		try {
			const deleteThoughts = await Thought.findOneAndDelete(

			);
			!deleteThoughts
				? rs.status(400).json({message: "no thoughts with that id"})
				: rs.status(200).json(deleteThoughts);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	}
};
