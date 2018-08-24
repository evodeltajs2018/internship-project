const ProjectController = require("../controllers/ProjectController");
const jwt = require('jsonwebtoken');
const config = require("../config/config");
const TokenService = require("../services/TokenService");

class ProjectRoute {
    constructor(app) {
        this.app = app;

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/projects", TokenService.verifyToken, (req, res) => {
            jwt.verify(req.token, config.secret, (err, auth) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    ProjectController.getAllProjects(req, res);
                }
            })
        });

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

        this.app.get("/projects/beatmap/:id", (req, res) => {
            ProjectController.getBeatmap(req, res);
        })

        this.app.put("/projects/beatmap/:id", (req, res) => {
            ProjectController.editBeatmap(req, res);
        })

        this.app.post("/projects/beatmap", (req, res) => {
            ProjectController.addBeatmap(req, res);
        })
    }
}

module.exports = ProjectRoute;