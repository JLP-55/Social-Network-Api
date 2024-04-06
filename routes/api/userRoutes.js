const router = require("express").Router();

const {
	createUser,
	readUser,
	readSingleUser,
	updateUser,
	deleteUser,	
} = require(/*path to models*/);

router
	.route("/")
	.get(readUser)
	.post(createUser);

router
	.route("/:userId")
	.get(readSingleUser)
	.put(updateUser)
	.delete(deleteUser);

module.exports = router;