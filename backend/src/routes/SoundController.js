//const sql = require("mssql");
const SoundService = require("../services/SoundService");

class SoundController {
    constructor(app) {
        this.app = app;
        
        //this.SoundService = require("../services/SoundService");
        this.service = new SoundService();

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/sound", (req, res) => {
            res.json([this.service.getSounds()]);
        });

        this.app.get("/sound/:id", (req, res) => {
            res.json([this.service.getSoundById(req.params.id)]);
        });
    }
}

module.exports = SoundController;
