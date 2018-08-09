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
		this.sql = sql;
	}
	
	connect() {
		this.connection = sql.connect(this.config);
	}

	executePoolRequest() {
		return this.connection
			.then(pool => {
				return pool.request();
			})
			.catch((err) => {
				console.log(err);
				return null;
			});	
	}

	executeQuery(query) {
		return this.connection
		.then(pool => {
			return pool.request().query(query);
		})
		.then((result) => {
			return result;
		}).catch((err) => {
			console.log(err);
			return null;
		});	
		
	}
}
module.exports = new DbConnection();