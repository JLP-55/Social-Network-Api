const mongoose = require("mongoose");
const Schema = require("mongoose");
// use the date library "moment" for easy formatting of the date
moment = require("moment");

// reaction schema is a subdocument?
const reactionSchema = new mongoose.Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId()
		},
		reactionBody: {
			type: String,
			required: true,
			maxLength: 280,
		},
		username: {
			type: String,
			required: true
		},
		createdAt: {
			type: Date,
			default: Date.now,
			// format timestamp
			get: (createdAtVal) => moment(createdAtVal).format("DD, MM, YYYY")
		}
	},
		{
			toJSON: {
				getters: true
		}	
	}
)

const thoughtSchema = new mongoose.Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			maxLength: 280,
			minLenght: 1
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [reactionSchema],
	},
		{
			toJSON: {
				virtuals: true,
				getters: true
			},
			id: false
		}	
);

// in the usermodels we reference the thought model, created from the thoughtSchema?
const Thought = mongoose.model("Thought", thoughtSchema);
const errorHandler = (err) => console.log(err);

module.exports = Thought
