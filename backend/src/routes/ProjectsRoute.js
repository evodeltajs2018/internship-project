const sql = require("mssql");

class SoundController {
	constructor(app) {
	 this.app = app;
   
	 app.get("/sound", (req, res) => {
	  this.getAll(req, res);
	 });
   
	 app.delete("/project", (req, res) => {
	  this.getAll(req, res);
	 });
	}
   
	getAll(req, res) {
	 res.json({
		 name: 1
	 });
	}
   }

function projectsRoute(app) {
	app.get("/projects", (req, res) => {
		// const config = {
        //     user: "usertest",
        //     password: "usertest",
        //     server: "localhost",
        //     database: "test",
		// 	port: 1333
        // };

		// sql.connect(config, err => {
		// 	new sql.Request().query("select * from users", (err, result) => {
		// 		if (err) {
		// 			console.log("sql error", err);
		// 			return;
		// 		}

		// 		res.json(result);
		// 	});
		// });

		res.json({
			projects: [{
				id:1,title:"Project Title 1",genre:"Rock",description:"First example project card cause we need something to see but nothing it's ok"
			},{
				id:2,title:"Project Title 2",genre:"Pop",description:"Second example project card cause we need something to ses but nothing it's ok"
			},{
				id:3,title:"Project Title 2",genre:"Hip-Hop",description:"Third example project card cause we need something to see but nothing it's ok"
			}]
		});
	});
}

module.exports = projectsRoute;
