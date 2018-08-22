const ProjectService = require("../services/ProjectService");

class ProjectController {
    constructor() {}

    getAllProjects(req, res) {
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

    getBeatmap(req, res) {
        return ProjectService.getBeatmap(req.params.id).then((data) => {
            return res.json(data);
        })
    }

    addBeatmap(req, res) {
        return ProjectService.addBeatmap(req.body).then(data => {
            return res.json(data);
        })
    }

    editBeatmap(req, res) {
        return ProjectService.editBeatmap(req.params.id, req.body).then(data => {
            return res.json(data);
        })
    }
}

module.exports = new ProjectController();