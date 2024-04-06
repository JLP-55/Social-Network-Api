const {Schema model} = require("mongoose");

const reactionSchema = new Schema (
	{
		reactionId {
			// objectId datatype
		},
		reactionBody {
			type: string,
			required: true,
			max_lenght: 280,
		},
		username {
			type: string,
			required: true
		},
		createdAt {
			date: /*date.now?*/
		}
	}	
)

