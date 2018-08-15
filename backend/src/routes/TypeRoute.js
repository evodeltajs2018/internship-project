const TypeController = require("../controllers/TypeController");

class TypeRoute {
    constructor(app) {
        this.app = app;

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/types", (req, res) => {
            TypeController.getAllTypes(res)
        });

        this.app.get("/typeall", (req, res) => {
            TypeController.getAll(req, res)
        });

        this.app.get("/types/:id", (req, res) => {
            TypeController.getTypeById(req, res);
        });

        this.app.post("/types", (req, res) => {
            TypeController.addType(req, res);
        });

        this.app.put("/types/:id", (req, res) => {
            TypeController.editType(req, res);
        });

        this.app.delete("/types/:id", (req, res) => {
            TypeController.deleteType(req, res);
        });
    }
}

module.exports = TypeRoute;