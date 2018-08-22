const DbConnection = require("../dbConnection/Connection");
// const DbMapper = require("../utils/DbMapper");

class AuthenticationService {
    constructor() {

    }

    verifyIfEmailExists(email) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('email', DbConnection.sql.NVarChar(50), email)
                    .query("SELECT * FROM Users WHERE Users.Email = @email")
            })
            .then(result => {
                return !(result.rowsAffected[0] === 1);
            });
    }

    checkEmail(email) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('email', DbConnection.sql.NVarChar(50), email)
                    .query("SELECT * FROM Users WHERE Users.Email = @email")
            })
            .then(result => {
                return result.rowsAffected[0] === 1;
            });
    }

    getHashedPasswordByEmail(email){
        return DbConnection.executePoolRequest()
        .then(pool => {
            return pool.input('email', DbConnection.sql.NVarChar(50), email)
            .query("SELECT Id, RoleId, Password From Users WHERE Users.Email = @email")
        })
        .then(result => result.recordset[0].Password && result.recordset[0].Id && result.recordset[0].RoleId ? { id: result.recordset[0].Id, hash: result.recordset[0].Password, roleId: result.recordset[0].RoleId} : null);

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
                            SELECT Id, RoleId FROM Users WHERE Users.Email = @email`);
            })
            .then(result => result.recordset[0].Id && result.recordset[0].roleId ? {id: result.recordset[0].Id, roleId: result.recordset[0].roleId} : null);
    }

}

module.exports = new AuthenticationService();