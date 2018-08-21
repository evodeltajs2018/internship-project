const ProjectController = require("../controllers/ProjectController");

class ProjectRoute {
    constructor(app) {
        this.app = app;

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/projects", ProjectController.getAllProjects);

        this.app.post("/projects", (req, res) => {
            ProjectController.addProject(req, res);
        });

        this.app.get("/projects/:id", (req, res) => {
            ProjectController.getProjectById(req, res);
        });

        this.app.put("/projects/:id", (req, res) => {
            ProjectController.editProject(req, res);
        });

        this.app.delete("/projects/:id", (req, res) => {
            ProjectController.deleteProject(req, res);
        });
    }
}

module.exports = ProjectRoute;