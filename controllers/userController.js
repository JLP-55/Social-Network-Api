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
	async getSingleUser(rq, rs) {
		try {
			const user = await User.findOne({_id: rq.params.userId});

			!user
				? rs.status(404).json({message: "no user with that id"}) 
				: rs.json(user);
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
	// async updateUser({params, body},rq, rs) {
	// 	try {
	// 		const newUpdate = await User.findOneAndUpdate(
	// 			{_id: params.id},
	// 			body, {new: true, runValidators: true}
	// 		);
	// 		// console.log(rq.params.userId);
	// 		// rs.json(newUpdate);
	// 		console.log(body);
	// 		rs.status(200).json(newUpdate);
	// 		!newUpdate
	// 			? rs.status(500).json({message: "no such user"})
	// 			: rs.status(200).json(newUpdate);
	// 		// console.log(newUpdate);
	// 	} catch (err) {
	// 		// error "rs.status(500).json(err)" is not a function
	// 		//		     ^
	// 		// rs.status(500).json(err);
	// 		console.log(err);
	// 	}
	// },

	// updateUser route works (using thenables)
	 updateUser(rq, rs) {
        User.findOneAndUpdate(rq.params.id, rq.body, { new: true })
        .then(userData => {
        	if (!userData) {
        		return rs.status(404).json({ message: 'User not found' });
        	}
        	rs.json(userData);
        })
        .catch(err => rs.status(500).json(err));
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
	},
	// addFriend route works (using thenables)
	addFriend(rq, rs) {
        User.findOneAndUpdate(
            { _id: rq.params.userId },
            { $addToSet: { friends: rq.body.friendId || rq.params.friendId } },
            { new: true }
        )
        .then(userData => {
        	if (!userData) {
        		return rs.status(404).json({ message: 'User not found' });
        	}
        	rs.json(userData);
        })
        .catch(err => rs.status(500).json(err));
    },
    // error: "rs.status" is not a function
	// async deleteFriend({params}, rq, rs) {
    // 	try {
    // 		const deleteFriend = await User.findOneAndUpdate(
	// 			{_id: params.userId},
	// 			// use $pull to remove from the array the specific friendId specified in the path parameters
	// 			{$pull: {friends: params.friendId}},
	// 			// send the updated search back to the user using "new: true"
	// 			{new: true}
	// 		)

    // 		!deleteFriend
    // 			? rs.status(404).json({message: "no user with that id"})
    // 			: rs.status(200).json(deleteFriend);
    // 	} catch (err) {
    // 		rs.status(500).json(err);
    // 		console.log(err);
    // 	}
    // }

    // deleteFriend route works (using thenables)
     deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then((friendData) => {
        	!friendData
        	? res.status(500).json({message: "not found"})
        	: res.status(200).json(friendData);
        })
        .catch((err) => res.status(400).json(err));
    },
};