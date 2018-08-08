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
			res.json(SoundService.getAll(page, itemsPerPage));
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
            // #1 convert the string to a node buffer
            // #2 save with mssql the buffer
            let i = 0;
            while (req.body.value[i] != null) {
                i++;
            }
            const buf1 = Buffer.alloc(i);
            for (let j = 0; j < i; j++) {
                buf1[j] = req.body.value[j];
                // console.log(buf1[j]);
            }

            // const buf = new Buffer(req.body.value[3]);
            // console.log(buf1);
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
			this.delete(req.params.id, req, res);
		});
    }
}

module.exports = SoundController;
