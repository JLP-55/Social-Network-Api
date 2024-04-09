const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// const {User} = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);

// app.get("/api/users", async (rq, rs) => {
// 	try {
// 		const result = await user.find({});
// 		rs.status(200).json(result);
// 		console.log(rs);
// 	} catch (err) {
// 		rs.status(500).send(err);
// 	}
// });

db.once("open", () => {
	app.listen(PORT, () => {
		console.log("server lisenting");
	});
});
