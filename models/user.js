const mongoose = require("mongoose");

// define the schema
const userSchema = new mongoose.Schema (
	{
		username: {
			// Just doing the very basica of a model to get something working.
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
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
module.exports = User;