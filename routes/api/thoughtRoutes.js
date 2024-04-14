const router = require("express").Router();

const {
	getThoughts,
	createThoughts
} = require("../../controllers/thoughtControllers");

router.route("/").get(getThoughts).post(createThoughts);

module.exports = router
