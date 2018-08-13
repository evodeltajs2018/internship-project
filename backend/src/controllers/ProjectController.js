const ProjectService = require("../services/ProjectService");

class ProjectController {
    constructor() {}

    getAllProjects(res) {
        return ProjectService.getAllProjects().then((data) => {
            return res.json(data);
        });
    }

    getProjectById(req, res) {
        return ProjectService.getProjectById(req.params.id).then((data) => {
            return res.json(data);
        });
    }

    addProject(req, res) {
        return ProjectService.addProject(req.body).then((data) => {
            return res.json(data);
        });
    }

    editProject(req, res) {
        return ProjectService.editProject(req.body).then((data) => {
            return res.json(data);
        });
    }

    deleteProject(req, res) {
        return ProjectService.deleteProject(req.params.id).then((data) => {
            return res.json(data);
        });
    }
}

module.exports = new ProjectController();