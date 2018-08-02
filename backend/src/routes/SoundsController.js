class SoundsController {
	constructor(app) {
		this.app = app;
		this.sql = require("mssql");

		app.get("/sounds", (req, res) => {
			this.getAll(req, res);	
		});
	}

	getAll(req, res) {
		const Service = require("../services/SoundsService.js");
		this.service = new Service();
		res.json(this.service.getAll());
	}
	
}

module.exports = SoundsController;
