function ProjectRoute(app) {
	app.get("/projects", (req, res) => {

		let ProjectService = require("../services/ProjectService");
		let projectService = new ProjectService();
		let projects = projectService.getAllProjects();

		let GenreService = require("../services/GenreService");
		let genreService = new GenreService();

		 for (let i = 0; i < projects.length; i++) {
		 	genre = genreService.getGenresById(projects[i].genre);
		 	projects[i].genre = genre;
             }

		res.json({
			projects
		});
	});

	app.get("/project/:id", (req, res) => {

		let id = req.params.id;
		let name = "";
		let genre = null;
		let description = "";

		let ProjectService = require("../services/ProjectService");
		let projectService = new ProjectService();
		let project = projectService.getProjectById(id);

		if (typeof project !== 'undefined') {
			name = project.name;
			description = project.description;

			let GenreService = require("../services/GenreService");
			let genreService = new GenreService();
			genre = genreService.getGenresById(project.genre);
		}

		res.json({
			"Id": req.params.id,
			"Name": name,
			"Genre": genre,
			"Description": description,
		});
	});
}

module.exports = ProjectRoute;
