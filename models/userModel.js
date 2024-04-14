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
			// this regex isn't working
			// match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
		},
		// array of _id values referencing the Thought model
		thoughts: [{
			type: Schema.types.ObjectId,
			// should this reference the "Thought" model created from the schema on line 30 in the thoughtModel.js file?
			ref: "Thought"
		}],
		// array of _id values referencing the User model
		friends: [{
			type: Schema.types.ObjectId,
			// same here, not sure if we are supposed to reference the model "User" created below?
			ref: "User"
		}]
	},
		{
			toJSON: {
				virtuals: true,
			},
			id: false,
		}
);

// getter
userSchema.virtual("friendCount").get(function () {
// Create a virtual called friendCount.
// It should retrieve the length of the user's friends array field on query.
// Currently doesn't do this
	const schema = `${this.username}`;
	return schema
	console.log(schema);
});

// create the schema
const User = mongoose.model("User", userSchema);
// error handler
const errorHandler = (err) => console.log(err);

// // create the schema
// User
// 	.create({
// 		username: "Trial_test-username",
// 		email: "Trial_test-email",
// 		anotherItem: "random item"
// 	})
// 	.then(result => console.log("trial success", result))
// 	.catch(err => errorHandler(err));

// export the schema
module.exports = User

// note: 
// this schema is currently being created everytime upon start up of the server
// this is not acceptable obviously, must change later