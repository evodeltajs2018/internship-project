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

	delete(id, req, res) {
		const all = SoundService.delete(id);
		if (all) {
			res.json(all);
		} else {
			res.json({});
		}

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

        this.app.get("/sounds", (req, res) => {
			this.getAll(req, res);
		});

		this.app.delete("/sound/:id", (req, res) => {
			res.json(this.delete(req.params.id, req, res));
		});
    }
}

module.exports = SoundController;
