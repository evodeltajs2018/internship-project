const SoundService = require("../services/SoundService");

class SoundController {
    constructor(app) {
        this.app = app;

        this.initRoutes();
    }

    getAll(req, res) {
        const page = req.query.page;
        const itemsPerPage = req.query.perpage;
        if (page && itemsPerPage) {
            SoundService.getAll(page, itemsPerPage, 
                { 
                    name: req.query.name, 
                    type: req.query.type 
                })
                .then((data) => {
                res.json(data);
            });

        } else {
            res.json({});
        }

    }

    addSound(req, res) {
        let sound = req.body;
        SoundService.addSound(sound).then((result) => {
            res.json(result);
        })
    }

    deleteSound(req, res) {
        let id = req.params.id;
        SoundService.delete(id).then((result) => {
            if (result) {
                res.json(result);
            } else {
                res.json({});
            }
        });
    }

    editSound(req, res) {
        let sound = req.body, id = req.params.id;
        SoundService.editSound(sound, id).then((result) => {
            res.json(result);
        });
    }

    getTypes(req, res) {
        SoundService.getTypes().then((result) => {
            res.json(result);
        });
    }

    getSoundById(req, res) {
        let id = req.params.id;
        SoundService.getSoundById(id).then((result) => {
            res.json(result);
        });
    }

    initRoutes() {
        this.app.get("/sounds/:id", (req, res) => {
            this.getSoundById(req, res);
        });

        this.app.post("/sounds", (req, res) => {
            this.addSound(req, res);
        });

        this.app.put("/sounds/:id", (req, res) => {
            this.editSound(req, res);
        });

        this.app.get("/types", (req, res) => {
            this.getTypes(req, res);
        });

        this.app.get("/sounds", (req, res) => {
            this.getAll(req, res);
        });

        this.app.delete("/sounds/:id", (req, res) => {
            this.deleteSound(req, res);
        });
    }
}

module.exports = SoundController;
