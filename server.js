const express = require("express");
const db = require("./config/connection");

const {User} = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/api/users", async (rq, rs) => {
	try {
		const result = await User.find({});
		rs.status(200).json(result);
	} catch (err) {
		rs.status(500).send(err);
	}
});

db.once("open", () => {
	app.listen(PORT, () => {
		console.log("server lisenting");
	});
});
