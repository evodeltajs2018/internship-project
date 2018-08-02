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
		res.json(this.service.getAll());
	}

	delete(id, req, res) {
		
		//console.log(req.params.id);
		
		this.service.delete(id);
		res.json({});
		
	}
	
}

module.exports = SoundsController;
