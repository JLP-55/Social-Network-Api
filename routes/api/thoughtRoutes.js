const router = require("express").Router();

const {
	getThoughts,
	getSingleThought,
	createThoughts,
	updateThoughts,
	deleteThoughts,
	addReaction,
	deleteReaction
} = require("../../controllers/thoughtControllers");

router.route("/").get(getThoughts).post(createThoughts);
router.route("/:thoughtId").get(getSingleThought).put(updateThoughts).delete(deleteThoughts);
router.route("/:thoughtId/reactions/:reactionId").post(addReaction).delete(deleteReaction);

module.exports = router
