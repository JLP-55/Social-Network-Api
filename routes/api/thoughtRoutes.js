const router = require("express").Router();

const {
	createthought ,
	readthought,
	readSingleThought,
	updatethought,
	deletethought,
} = require(/*path to models*/);

router
	.route("/")
	.get(readThought)
	.post(createThought)

router
	.route("/:thoughtId")
	.get(readThoughtId)
	.put(updatethought)
	.delete(deleteThought)

module.exports = router;