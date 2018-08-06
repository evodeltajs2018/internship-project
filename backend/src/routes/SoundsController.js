class SoundsController {
	constructor(app) {
		this.app = app;
		this.sql = require("mssql");

		const SoundService = require("../services/SoundsService.js");
		this.service = new SoundService();

		this.initRoutes();
	}

	initRoutes() {
		this.app.get("/sounds", (req, res) => {

			this.getAll(req, res);
		});

		this.app.delete("/sounds/:id", (req, res) => {

			this.delete(req.params.id, req, res);
		});
	}

	getAll(req, res) {
		const page = req.query.page;
		const itemsPerPage = req.query.perpage;
		if (page && itemsPerPage) {
			res.json(this.service.getAll(page, itemsPerPage));
		} else {
			res.json({});
		}

	}

	delete(id, req, res) {
		const all = this.service.delete(id);
		if (all) {
			res.json(all);
		} else {
			res.json({});
		}

	}

}

module.exports = SoundsController;
