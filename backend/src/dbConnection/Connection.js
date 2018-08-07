const sql = require("mssql");

class DbConnection {
    constructor() {
        this.config = {
            user: "internship_user",
            password: "internship_user",
            server: "localhost",
            database: "InternshipProject",
			port: 1535
		};
		this.connect();

		
	}
	
	connect() {
		this.connection = sql.connect(this.config, err => {
			sql.close();
		});
	}

	executeQuery(query, onSuccess) {
		new sql.Request().query(query, (err, result) => {
			if (err) {
				console.log("sql error", err);
				return null;
			}
			onSuccess(result);
		});	
		
	}
}
module.exports = new DbConnection();