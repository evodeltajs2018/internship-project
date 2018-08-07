const sql = require("mssql");

class ProjectController {
    constructor(app) {
        const ProjectService = require("../services/ProjectsService.js");
        this.app = app;
        this.service = new ProjectService();

        const config = {
            user: "internship_user",
            password: "internship_user",
            server: "localhost",
            database: "InternshipProject",
			port: 1535
        };

        app.get("/project", (req, res) => {
            this.getAll(req, res);
        });

        app.delete("/project/:id", (req, res) => {
            this.deleteProject(req.params.id, req, res);
        });
    }

    getAll(req, res) {
        res.json(this.service.getAll());
    }

    deleteProject(id, req, res) {
        this.service.deleteById(req.params.id);
        res.json({});
    }
}

module.exports = ProjectController;