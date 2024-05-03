const mongoose = require("mongoose");
const {Schema, Model} = require("mongoose");

// define the schema
const userSchema = new Schema (
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
		},
		// array of _id values referencing the Thought model
		thoughts: [{
			type: Schema.Types.ObjectId,
			// should this reference the "Thought" model created from the schema in the thoughtModel.js file?
			// or should it reference the thoughtSchema?
			ref: "thoughtSchema"
			// ref: "Thought"
		}],
		// array of _id values referencing the User model
		friends: [{
			type: Schema.Types.ObjectId,
			// same here, not sure if we are supposed to reference the model "User" created below or the userSchema defined above?
			ref: "userSchema"
			// ref: "User"
		}]
	},
		{
			toJSON: {
				virtuals: true,
			},
			id: false,
		}
);

// getter for the total number of friends
// Create a virtual called friendCount.
// It should retrieve the length of the user's friends array field on query.
userSchema.virtual("friendCount").get(function () {
	const schema = `${this.friends.length}`;
	return schema
	console.log(schema);
});

// create the schema
const User = mongoose.model("User", userSchema);
// error handler
const errorHandler = (err) => console.log(err);

// export the schema
module.exports = User