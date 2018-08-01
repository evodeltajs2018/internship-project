const sql = require("mssql");

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
				id:1,title:"Project Title 1",genre:"Rock",description:"askjdgaishbdvajhsdvbadhaldhalsjdvhaljs"
			},{
				id:2,title:"Project Title 2",genre:"Pop",description:"kasdhalsdbajsdklasdsdklasdlasdklasdlasdklasdlasdklasdlasdklasdlalasbkjd"
			},{
				id:3,title:"Project Title 2",genre:"Hip-Hop",description:"askjdgasjkdlnasokdvhasdkbjasdiashd"
			}]
		});
	});
}

module.exports = projectsRoute;
