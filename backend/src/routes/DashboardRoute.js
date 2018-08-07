const sql = require("mssql");

function dashboardRoute(app) {
	app.get("/dashboard", (req, res) => {
        // const config = {
        //     user: "internship_user",
        //     password: "internship_user",
        //     server: "localhost",
        //     database: "InternshipProject",
		// 	port: 1535
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
			test: "abc"
		});
	});
}

module.exports = dashboardRoute;
