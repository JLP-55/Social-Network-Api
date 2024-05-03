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
			const thought = await Thought.findOne({_id: rq.params.thoughtId});
			// rs.json(thought);
			!thought
				?rs.status(404).json({message: "no such thought exists"})
				:rs.status(200).json(thought);
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
				{_id: rq.body.thoughtId},
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
	// updateThoughs route works (using thenables)
	 updateThoughts(rq, rs) {
        Thought.findOneAndUpdate(rq.params.id, rq.body, { new: true })
        .then(thoughtData => {
        	if (!thoughtData) {
        		return rs.status(404).json({ message: 'thought not found' });
        	}
        	rs.json(thoughtData);
        })
        .catch(err => rs.status(500).json(err));
    },
	// TODO: this route isn't functioning correctly
	// ! currently it will not actually update a thought, 
	// ! only respond with the thought who's id the user has selected
	// async updateThoughts(rq, rs) {
	// 	try {
	// 		const updateThoughts = await Thought.findOneAndUpdate(
	// 			{_id: rq.params.thoughtId},
	// 			// we want to add to the set thougts, either the thought with the id specified in the path parameters or the id specified in the body
	// 			{$addToSet: {thoughts: rq.body.thoughtId || rq.params.thoughtId}},
	// 			// {$push: {thoughts: rq.body.thoughtId || rq.params.thoughtId}},
	// 			{new: true}
	// 			// we need to actually take some user input and update the given "rq.body.thoughtId"
	// 			// use "$addToSet"? Can't remember what this does.
	// 		);
	// 		!updateThoughts
	// 		 	? rs.status(404).json({message: "no thought with that id"})
	// 		 	: rs.status(200).json(updateThoughts);
	// 		console.log(updateThoughts);
	// 	} catch (err) {
	// 		rs.status(500).json(err);
	// 		console.log(err);
	// 	}
	// },
	// deleteThought route works
	async deleteThoughts(rq, rs) {
		try {
			const deleteThoughts = await Thought.findOneAndDelete(
				{_id: rq.params.thoughtId}
			);
			console.log(deleteThoughts);
			!deleteThoughts
				? rs.status(404).json({message: "no thoughts with that id"})
				: rs.status(200).json({message: "thought deleted"});
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	// addReaction route works
	async addReaction(rq, rs) {
		try {
			const addReaction = await Thought.findOneAndUpdate(
				{_id: rq.params.thoughtId},
				{$push: {reactions: rq.body}},
				{$addToSet: {thoughts: rq.body.thoughtId || rq.params.thoughtId}},
				{new: true}
			);
				!addReaction
					? rs.status(500).json({message: "no such thought"})
					: rs.status(200).json(addReaction);
					console.log(addReaction);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	// deleteReaction route doesn't work even after using findOneAndUpdate, not sure why
	async deleteReaction(rq, rs) {
		try {
			const deleteReaction = await Thought.findOneAndUpdate(
				{_id: rq.params.thoughtId},
				{$pull: {reactions: {reactionId: rq.params.reactionId}}},
				{new: true}
			);

			!deleteReaction
				? rs.status(500).json({message: "no such reaction exists"})
				: rs.status(200).json(deleteReaction);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	}
};
