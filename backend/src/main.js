const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/dashboard", (req, res) => {
	res.json({
		test: "abc",
		items: [
			1,
			2,
			3,
			4
		]
	});
});

app.listen(5000, () => console.log("Listening on port 5000..."));
