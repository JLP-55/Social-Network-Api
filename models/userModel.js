const mongoose = require("mongoose");

// define the schema
const userSchema = new mongoose.Schema (
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
		anotherItem: {
			type: String,
			required: true,
			unique: true,
		}
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