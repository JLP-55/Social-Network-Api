const {Schema, model} = require("mongoose");

const thoughtsSchema = new Schema (
	{
		thoughtText {
			type: string,
			required: true,
			max_lenght: 280,
			min_lenght: 1
		},
		createdAt {
			date: /*date.now?*/	
		},
		username {
			type: string,
			required: true
		},
		reactions {
			// array of nested documents created with the reactionSchema
		}
	}
);
