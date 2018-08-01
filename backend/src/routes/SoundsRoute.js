const sql = require("mssql");

function soundsRoute(app) {
	app.get("/sounds", (req, res) => {
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
			data: [
                {
                    id: 1,
                    name: "Clap",
                    type: "Percution"
                },
                {
                    id: 2,
                    name: "Clap",
                    type: "Percution"
                },
                {
                    id: 3,
                    name: "Clap",
                    type: "Percution"
                },
                {
                    id: 4,
                    name: "Clap",
                    type: "Percution"
                },
                {
                    id: 5,
                    name: "Clap",
                    type: "Percution"
                },
            ]
		});
	});
}

module.exports = soundsRoute;
