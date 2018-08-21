const DbConnection = require("../dbConnection/Connection");
const DbMapper = require("../utils/DbMapper");

class ProjectService {
    constructor() {
    }

    getBeatmap(projectId) {
        return DbConnection.executePoolRequest()
        .then(pool => {
            return pool
            .input("projectId", DbConnection.sql.Int, projectId)
            .query(`
                SELECT * FROM Beatmap WHERE ProjectId = @projectId
            `);
        }).then(result => {
            return result.recordset.map(record => {
                return DbMapper.mapBeatmap(record);
            });
        })
    }

    getAllProjects() {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.query(`
            SELECT P.Id, P.Name, P.Description, P.GenreId, G.Name AS GenreName, P.Bpm AS Bpm
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
                    .query(`SELECT P.Id, P.Name, P.Description, P.GenreId, 
                        G.Name AS GenreName, P.Bpm
                        FROM Project P INNER JOIN Genre G ON P.GenreId = G.Id
                        WHERE P.Id LIKE @id`)
            })
            .then((result) => {
                return result.recordset.map((record) => {
                    return DbMapper.mapProject(record)
                });
            });
    }

    addBeatmap(beatmap) {
        return DbConnection.executePoolRequest()
        .then(pool => {
            return pool
            .input('soundId', DbConnection.sql.Int, beatmap.soundId)
            .input('projectId', DbConnection.sql.Int, Number.parseInt(beatmap.projectId))
            .input('map', DbConnection.sql.NVarChar(100), beatmap.map.join(","))
            .query(`
                INSERT INTO Beatmap(SoundId, ProjectId, Map) VALUES
                (@soundId, @projectId, @map)
            `)
        }).then(result => {
            return result.rowsAffected[0] === 1;
        })
    }

    editBeatmap(id, beatmap) {
        return DbConnection.executePoolRequest()
        .then(pool => {
            return pool
            .input('id', DbConnection.sql.Int, id)
            .input('soundId', DbConnection.sql.Int, beatmap.soundId)
            .input('projectId', DbConnection.sql.Int, Number.parseInt(beatmap.projectId))
            .input('map', DbConnection.sql.NVarChar(100), beatmap.map)
            .input('bpm', DbConnection.sql.Int, beatmap.bpm)
            .query(`
                UPDATE Beatmap
                SET SoundId = @soundId,
                    ProjectId = @projectId,
                    Map = @map
                WHERE Id = @id

                UPDATE Project
                SET Bpm = @bpm
                WHERE Id = @projectId
            `)
            
        }).then(result => {
            return result.rowsAffected[0] === 1;
        })
    }

    addProject(project) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('name', DbConnection.sql.NVarChar(50), project.name)
                    .input('genreId', DbConnection.sql.Int, project.genre.id)
                    .input('description', DbConnection.sql.NVarChar(500), project.description)
                    .query(`INSERT INTO Project(Name, GenreId, Description, Bpm)
            VALUES (@name, @genreId, @description, 60)`)
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