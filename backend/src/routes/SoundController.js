//const sql = require("mssql");
const SoundService = require("../services/SoundService");
const bodyParser = require('body-parser');

class SoundController {
    constructor(app) {
        this.app = app;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.service = new SoundService();

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/sound/:id", (req, res) => {
            res.json([this.service.getSoundById(req.params.id)]);
        });

        this.app.post("/sound", (req, res) => {
            this.service.addSounds(req.body);
            res.json([this.service.addSounds(req.body)]);
            console.log(req.body.name);
        });

        this.app.get("/sound", (req, res) => {
            res.json([this.service.getTypes()]);
        });
    }
}

module.exports = SoundController;
