// ensure to specify the exact path to the model of you are destructuring {User, Thought}
const User = require("../models/userModel.js");
// do we need this to access the model from getSingleUser path?
const Thought = require("../models/thoughtModel.js");

module.exports = {
	async getUsers(rq, rs) {
		try {
			const user = await User.find();
			rs.json(user);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	// new route
	// what does the path reference? the model that we have exported?
	async getSingleUser(rq, rs) {
		try {
			// this will only get the first user and the return "headers sent" error
			const post = await User.findOne({name: rq.params.ObjectId});
			rs.status(200).json(post);
			// const post = await User.findOne({_id: rq.params.postId}).populate({
			// 	// I am not sure what you need for the path
			// 	// this path currently returns a 404 error not found message
			// 	path: "User",
			// });

			!post
				? rs.status(404).json({message: "no user with that id"}) 
				: rs.json(post);

		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	async createUser(rq, rs) {
		try {
			const newUser = await User.create(rq.body);
			rs.json(newUser);
			console.log(newUser);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	async updateUser(rq, rs) {
		try {
			const newUpdate = await User.findOneAndUpdate(/*figure out what has to go here*/)
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	}
	async deleteUser(rq, rs) {
		try {
			const deleteUser = await User.findOneAndDelete({_id: rq.params.userId});
			rs.status(200).json(deleteUser);			
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	}
};