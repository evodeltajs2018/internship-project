const DbConnection = require("../dbConnection/Connection");
const DbMapper = require("../utils/DbMapper");

class ProjectService {
    constructor() {
    }

    getAllProjects() {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.query(`
            SELECT P.Id, P.Name, P.Description, P.GenreId, G.Name AS GenreName
            FROM Project P INNER JOIN Genre G ON P.GenreId = G.Id
            ORDER BY P.Id DESC`)
            })
            .then((result) => {
                return result.recordset.map((record) => {
                    return DbMapper.mapProject(record)
                });
            });
    }

    getProjectById(id) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('id', DbConnection.sql.Int, id)
                    .query(`SELECT P.Id, P.Name, P.Description, P.GenreId, G.Name AS GenreName
                        FROM Project P INNER JOIN Genre G ON P.GenreId = G.Id
                        WHERE P.Id LIKE @id`)
            })
            .then((result) => {
                return result.recordset.map((record) => {
                    return DbMapper.mapProject(record)
                });
            });
    }

    addProject(project) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('name', DbConnection.sql.NVarChar(50), project.name)
                    .input('genreId', DbConnection.sql.Int, project.genre.id)
                    .input('description', DbConnection.sql.NVarChar(500), project.description)
                    .query(`INSERT INTO Project(Name, GenreId, Description)
            VALUES (@name, @genreId, @description)`)
            })
            .then((result) => {
                return result.rowsAffected[0] === 1;
            });
    }

    editProject(project) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('id', DbConnection.sql.Int, project.id)
                    .input('name', DbConnection.sql.NVarChar(50), project.name)
                    .input('genreId', DbConnection.sql.Int, project.genre.id)
                    .input('description', DbConnection.sql.NVarChar(500), project.description)
                    .query(`UPDATE Project
                            SET 
                                Name = @name,
                                GenreId = @genreId,
                                Description = @description
                            WHERE Id = @id;`)
            })
            .then((result) => {
                return result.rowsAffected[0] === 1;
            });
    }

    deleteProject(id) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('id', DbConnection.sql.Int, id)
                    .query(`DELETE FROM Project WHERE Id = @id;`)
            })
            .then((result) => {
                return result.rowsAffected[0] === 1;
            });
    }
}

module.exports = new ProjectService();