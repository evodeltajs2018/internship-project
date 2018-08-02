function ProjectRoute(app) {
	app.get("/project/:id", (req, res) => {

		let id = req.params.id;
		let name = "New Project Name...";
		let description = "default description";
		let genre = 0;

		if (id == "1") {
			name = "Project 1";
			description = "description1";
			genre = 1;
		}

		if (id == "2") {
			name = "Project 2";
			description = "description2";
			genre = 2;
		}

		res.json({
			"Id": req.params.id,
			"Name": name,
			"Description": description,
			"Genre": genre,
		});
	});
}

module.exports = ProjectRoute;
