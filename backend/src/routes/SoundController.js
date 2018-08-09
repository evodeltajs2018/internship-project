const SoundService = require("../services/SoundService");
const bodyParser = require('body-parser');

class SoundController {
    constructor(app) {
        this.app = app;

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.initRoutes();
    }

    getAll(req, res) {
        const page = req.query.page;
        const itemsPerPage = req.query.perpage;
        if (page && itemsPerPage) {
            SoundService.getAll(page, itemsPerPage).then((data) => {
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
        this.app.get("/sound/:id", (req, res) => {
            this.getSoundById( req, res);
        });

        this.app.post("/sound", (req, res) => {
            this.addSound(req, res);
        });

        this.app.post("/sound/:id", (req, res) => {
            this.editSound(req, res);
        });

        this.app.get("/sound", (req, res) => {
            this.getTypes(req, res);
        });

        this.app.get("/sounds", (req, res) => {
            this.getAll(req, res);
        });

        this.app.delete("/sound/:id", (req, res) => {
            this.deleteSound(req, res);
        });
    }
}

module.exports = SoundController;
