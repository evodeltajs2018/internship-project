const ProjectService = require("../services/ProjectService");
const bodyParser = require('body-parser');

class ProjectController {
    constructor(app) {
        this.app = app;

        const config = {
            user: "internship_user",
            password: "internship_user",
            server: "localhost",
            database: "InternshipProject",
			port: 1535
        };
        
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/projects", (req, res) => {
            res.json(ProjectService.getAllProjects());
		});

        this.app.get("/project/:id", (req, res) => {
            res.json([ProjectService.getProjectById(req.params.id)][0][0]);
        });

        this.app.post("/project", (req, res) => {
            res.json([ProjectService.addProject(req.body)]);
        });
        
        this.app.post("/project/:id", (req, res) => {
            res.json([ProjectService.editProject(req.body, req.params.id)]);
        });

		this.app.delete("/project/:id", (req, res) => {
            res.json([ProjectService.deleteProject(req.body, req.params.id)]);
        });
    }
}

module.exports = ProjectController;