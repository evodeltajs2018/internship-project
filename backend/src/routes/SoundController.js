const SoundService = require("../services/SoundService");
const bodyParser = require('body-parser');

class SoundController {
    constructor(app) {
        this.app = app;
        
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/sound/:id", (req, res) => {
            res.json([SoundService.getSoundById(req.params.id)][0][0]);
        });

        this.app.post("/sound", (req, res) => {
            res.json([SoundService.addSounds(req.body)]);
        });
        
        this.app.post("/sound/:id", (req, res) => {
            res.json([SoundService.editSound(req.body, req.params.id)]);
        });

        this.app.get("/sound", (req, res) => {
            res.json([SoundService.getTypes()]);
        });
    }
}

module.exports = SoundController;
