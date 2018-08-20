const ProjectService = require("../services/ProjectService");

class ProjectController {
    constructor() {}

    getAllProjects(req, res) {
        const page = req.query.page;
        const itemsPerPage = req.query.perpage;
        if (page && itemsPerPage) {
            return ProjectService.getAllProjects(page, itemsPerPage, {
                    name: req.query.name,
                    genre: req.query.genre
                })
                .then((data) => {
                    return res.json(data);
                });

        } else {
            return res.json({});
        }

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