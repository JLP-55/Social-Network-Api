// ensure to specify the exact path to the model of you are destructuring {User, Thought}
const User = require("../models/userModel.js");
// do we need this to access the model from getSingleUser path?
const Thought = require("../models/thoughtModel.js");

module.exports = {
	// get users route works
	async getUsers(rq, rs) {
		try {
			const user = await User.find({});
			rs.json(user);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	},
	// get single user route doen't work
	// having an issue with the userId parameter, says there are no user's with specific id in the path parameter
	async getSingleUser(rq, rs) {
		try {
			// what is the difference between "userId" and "ObjectId"
			// ObjectId is the unique id within mongodb and userId is the path parameter I have created?
			const post = await User.findOne({name: rq.params.userId}, console.log(rq.params.userId));
			// post is null???
			console.log(post);
			// rs.status(200).json(post);
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
	// "err: rs.status is not a function"
	// comment this out and get "cannot read properties of undefined (reading userId)"
	async updateUser(/*{params, body},*/rq, rs) {
		try {
			console.log(body);
			// console.log(rq.params.userId);
			const newUpdate = await User.findOneAndUpdate(
				{_id: rq.params.userId},
				body, {new: true, runValidators: true})
			console.log(newUpdate);
		} catch (err) {
			// rs.status(500).json(err);
			console.log(err);
		}
	},
	// delete route works 
	async deleteUser(rq, rs) {
		try {
			// what make this path parameter work while the one in updateUser throws an error?
			const deleteUser = await User.findOneAndDelete({_id: rq.params.userId});
			console.log(deleteUser);

			!deleteUser
				? rs.status(404).json({message: "no user with that id"}) 
				: rs.status(200).json(deleteUser);
		} catch (err) {
			rs.status(500).json(err);
			console.log(err);
		}
	}
};