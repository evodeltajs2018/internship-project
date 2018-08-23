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

    verifyIfPasswordIsCorrect(email, password) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool
                    .input('email', DbConnection.sql.NVarChar(50), email)
                    .input('password', DbConnection.sql.NVarChar(DbConnection.sql.MAX), password)
                    .query("SELECT Email, Password FROM Users WHERE Email = @email AND Password = @password")
            })
            .then(result => {
                console.log(result.rowsAffected[0]);
                return result.rowsAffected[0] === 1;
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

    getHashedPasswordByEmail(email) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('email', DbConnection.sql.NVarChar(50), email)
                    .query("SELECT Id, RoleId, Password, FirstName, LastName From Users WHERE Users.Email = @email")
            })
            .then(result => result.recordset[0].Id ? result.recordset[0] : null);
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
                            SELECT Id, RoleId, FirstName, LastName FROM Users WHERE Users.Email = @email`);
            })
            .then(result => result.recordset[0].Id ? result.recordset[0] : null);
    }

    edit(data) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool
                    .input('firstName', DbConnection.sql.NVarChar(25), data.firstName)
                    .input('lastName', DbConnection.sql.NVarChar(25), data.lastName)
                    .input('email', DbConnection.sql.NVarChar(50), data.email)
                    .input('roleId', DbConnection.sql.Int, data.roleId)
                    .input('hashedPassword', DbConnection.sql.NVarChar(DbConnection.sql.MAX), data.password)
                    .query(`UPDATE Users SET 
                        FirstName = @firstName,
                        LastName = @lastName,
                        Password = @hashedPassword,
                        RoleId = @roleId
                        WHERE Email = @email;
                        `);
            })
            .then(result => {
                return result.rowsAffected[0] === 1;
            })
    }
}

module.exports = new AuthenticationService();