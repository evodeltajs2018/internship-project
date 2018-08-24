const TypeService = require("../services/TypeService");

class TypeController {
    constructor() {
    }

    getAllTypes(req, res) {
        return TypeService.getAllTypes().then((data) => {
            return res.json(data);
        });
    }

    getAll(req, res) {
        const page = req.query.page;
        const itemsPerPage = req.query.perpage;
        if (page && itemsPerPage) {
            return TypeService.getAll(page, itemsPerPage, {
                    name: req.query.name,
                    type: req.query.type
                })
                .then((data) => {
                    return res.json(data);
                });

        } else {
            return res.json({});
        }
    }

    getTypeById(req, res) {
        return TypeService.getTypeById(req.params.id).then((data) => {
            return res.json(data);
        });
    }

    addType(req, res) {
        return TypeService.addType(req.body).then((result) => {
            res.json(result);
        }); 
    }

    editType(req, res) {
        const { id } = req.params;
        return TypeService.editType(req.body, id).then((result) => {
            res.json(result);
        });
    }

    deleteType(req, res) {
        const { id } = req.params;
        return TypeService.delete(id).then((result) => {
            if (result) {
                return res.json(result);
            } else {
                return res.json({});
            }
        });
    }
}

module.exports = new TypeController();