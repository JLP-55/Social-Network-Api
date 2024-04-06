const {Schema, model} = require("mongoose");

const userSchema = new Schema(
	{
		username {
			type: String,
			required: true,
			// trimmed: true
		},
		email {
			type: String,
			required: true,
		},
		thoughts {},
		friends {},
	}
);

const User = module("user", )

module.exports = model("", userScheam);

// example from mongoosejs.com
// const schema = new Schema({
//   name: {
//     type: String,
//     required: true
//   }
// });
// const Cat = db.model('Cat', schema);

// // This cat has no name :(
// const cat = new Cat();

// let error;
// try {
//   await cat.save();
// } catch (err) {
//   error = err;
// }

// assert.equal(error.errors['name'].message,
//   'Path `name` is required.');

// error = cat.validateSync();
// assert.equal(error.errors['name'].message,
//   'Path `name` is required.');