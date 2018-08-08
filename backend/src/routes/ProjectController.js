const ProjectService = require("../services/ProjectService");
const bodyParser = require('body-parser');

class ProjectController {
    constructor(app) {
        this.app = app;
        
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


// //const sql = require("mssql");

// class ProjectController {
//     constructor(app) {






//         const ProjectService = require("../services/ProjectsService.js");
//         this.app = app;
//         this.service = new ProjectService();

//         app.get("/project", (req, res) => {
//             this.getAll(req, res);
//         });

//         app.delete("/project/:id", (req, res) => {
//             this.deleteProject(req.params.id, req, res);
//         });
//     }

//     getAll(req, res) {
//         res.json(this.service.getAll());
//     }

//     deleteProject(id, req, res) {
//         this.service.deleteById(req.params.id);
//         res.json({});
//     }
// }

// module.exports = ProjectController;