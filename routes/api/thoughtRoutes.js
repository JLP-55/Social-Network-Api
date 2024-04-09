const router = require("express").Router();

const {
	// get request for getThoughts
	getThoughts,
} = require("../../controllers/thoughtControllers");

router.route("/").get(getThoughts);

module.exports = router
