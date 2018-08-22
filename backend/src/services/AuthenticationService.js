const DbConnection = require("../dbConnection/Connection");
// const DbMapper = require("../utils/DbMapper");

class AuthenticationService {
    constructor() {

    }

    verifyEmail(email) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('email', DbConnection.sql.NVarChar(50), email)
                    .query("SELECT * FROM Users WHERE Users.email = @email")
            })
            .then(result => {
                return !(result.rowsAffected[0] === 1);
            });
    }

    register(data) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool
                    .input('firstName', DbConnection.sql.NVarChar(25), data.firstName)
                    .input('lastName', DbConnection.sql.NVarChar(25), data.lastName)
                    .input('username', DbConnection.sql.NVarChar(50), data.username)
                    .input('email', DbConnection.sql.NVarChar(50), data.email)
                    .input('hashedPassword', DbConnection.sql.NVarChar(DbConnection.sql.MAX), data.hashedPassword)
                    .query(`INSERT INTO Users VALUES (@firstName, @lastName, @username, @email, @hashedPassword, 2);
                            SELECT Id FROM Users WHERE Email = @email`);
            })
            .then(result => result.recordset[0].Id ? result.recordset[0].Id : null);
    }

}

module.exports = new AuthenticationService();