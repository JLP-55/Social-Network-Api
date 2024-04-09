const mongoose = require("mongoose");

// define the schema
const userSchema = new mongoose.Schema (
	{
		username: {
			// Just doing the very basica of a model to get something working.
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
		}
	}
);

const User = mongoose.model("User", userSchema);
const errorHandler = (err) => console.log(err);

// create the schema
User
	.create({
		username: "Trial_test-username",
		email: "Trial_test-email",
	})
	.then(result => console.log("trial success", result))
	.catch(err => errorHandler(err));

// export the schema
module.exports = User