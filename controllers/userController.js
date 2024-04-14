// ensure to specify the exact path to the model of you are destructuring {User, Thought}
const User = require("../models/userModel.js");
// do we need this to access the model from getSingleUser path?
const Thought = require("../models/thoughtModel.js");

module.exports = {
	// get users route works
	async getUsers(rq, rs) {
		try {
			const user = await User.find();
			rs.json(user);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	// get single user route doen't work
	// returns a "headers sent to client" error
	// seemingly it can still return the first user in the database, 
	// not the specifically searched for user however
	async getSingleUser(rq, rs) {
		try {
			// what is the difference between "userId" and "ObjectId"
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
	// post route works 
	async createUser(rq, rs) {
			const newUser = await User.create(rq.body);
		try {
			rs.json(newUser);
			console.log(newUser);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	// update route doen't work
	async updateUser(rq, rs) {
		try {
			const newUpdate = await User.findOneAndUpdate(/*figure out what has to go here*/)
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	// delete route works 
	async deleteUser(rq, rs) {
		try {
			const deleteUser = await User.findOneAndDelete({_id: rq.params.userId});
			console.log(deleteUser);
			rs.status(200).json({message: "user deleted"});			
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	}
};