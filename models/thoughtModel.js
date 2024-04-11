// const mongoose = require("mongoose");

// const thoughtSchema = new mongoose.Schema(
// 	{
// 		thoughtText: {
// 			type: String,
// 			required: true,
// 			// unique: true,
// 			trim: true,
// 		},
// 		createdAt: {
// 			type: String,
// 			required: true,
// 			// unique: true,
// 		}
// 	}	
// );

// const Thought = mongoose.model("Thought", thoughtSchema);
// const errorHandler = (err) => console.log(err);

// Thought 
// 	. create({
// 		thoughtText: "trial text block",
// 		createdAt: "This will be a date or something",
// 	})
// 	.then(result => console.log("trial success", result))
// 	.catch(err => errorHandler(err));

// module.exports = Thought

// // To do:
// // There is a duplicate error from this schema when seeding a second time
