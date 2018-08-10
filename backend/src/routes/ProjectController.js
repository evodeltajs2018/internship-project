const ProjectService = require("../services/ProjectService");

class ProjectController {
    constructor(app) {
        this.app = app;

        this.initRoutes();
    }

    getAllProjects(res) {
        ProjectService.getAllProjects().then((data) => {
            res.json(data);
        });
    }

    getProjectById(req, res) {
        ProjectService.getProjectById(req.params.id).then((data) => {
            res.json(data);
        });
    }

    addProject(req, res) {
        ProjectService.addProject(req.body).then((data) => {
            res.json(data);
        });
    }

    editProject(req, res) {
        ProjectService.editProject(req.body).then((data) => {
            res.json(data);
        });
    }

    deleteProject(req, res) {
        ProjectService.deleteProject(req.params.id).then((data) => {
            res.json(data);
        });
    }

    initRoutes() {
        this.app.get("/projects", (req, res) => {
            this.getAllProjects(res);
        });

        this.app.post("/projects", (req, res) => {
            this.addProject(req, res);
        });

        this.app.get("/projects/:id", (req, res) => {
            this.getProjectById(req, res);
        });

        this.app.put("/projects/:id", (req, res) => {
            this.editProject(req, res);
        });

        this.app.delete("/projects/:id", (req, res) => {
            this.deleteProject(req, res);
        });
    }
}

module.exports = ProjectController;