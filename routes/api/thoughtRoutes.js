const router = require("express").Router();

const {
	getThoughts,
	getSingleThought,
	createThoughts,
	updateThoughts,
	deleteThoughts
} = require("../../controllers/thoughtControllers");

router.route("/").get(getThoughts).post(createThoughts);
router.route("/:userId").get(getSingleThought).put(updateThoughts).delete(deleteThoughts);

module.exports = router
