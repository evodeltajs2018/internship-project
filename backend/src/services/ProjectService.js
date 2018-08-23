const DbConnection = require("../dbConnection/Connection");
const DbMapper = require("../utils/DbMapper");

class ProjectService {
    constructor() {
        this.fromwhere = `
        FROM Project P INNER JOIN Genre G On P.GenreId = G.Id
        WHERE LOWER(P.Name) LIKE '%' + LOWER(@name) + '%' AND G.Name LIKE '%' + LOWER(@genreName) + '%'
        `;
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

getPageCount(itemsPerPage, filter) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('itemsPerPage', DbConnection.sql.Int, itemsPerPage)
                    .input('name', DbConnection.sql.NVarChar(50), filter.name)
                    .input('genreName', DbConnection.sql.NVarChar(50), filter.genre)
                    .query(`SELECT CEILING(CAST(COUNT(*) AS FLOAT) / @itemsPerPage) AS itemCount
                            ${this.fromwhere}
                        `)
            })
            .then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
                return null;
            });
    }

    getCount(filter) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('name', DbConnection.sql.NVarChar(50), filter.name)
                    .input('genreName', DbConnection.sql.NVarChar(50), filter.genre)
                    .query(`SELECT COUNT(*) AS Count 
                            ${this.fromwhere}
                        `)
            })
            .then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
                return null;
            });
    }

    getAllProjects(page, itemsPerPage, filter) {
        if (page === 0) {
            page = 1;
        }

        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('page', DbConnection.sql.Int, page)
                    .input('itemsPerPage', DbConnection.sql.Int, itemsPerPage)
                    .input('name', DbConnection.sql.NVarChar(50), filter.name)
                    .input('genreName', DbConnection.sql.NVarChar(50), filter.genre)
                    .query(`
                    SELECT P.Id, 
                        P.Name, 
                        P.Description, 
                        P.GenreId, 
                        G.Name AS GenreName, 
                        P.Bpm as Bpm,
                        P.UserEmail as UserEmail,
                        U.Username as Username

                    FROM Project P 
                        INNER JOIN Genre G On P.GenreId = G.Id
                        INNER JOIN Users U ON U.Email = P.UserEmail
                    WHERE LOWER(P.Name) LIKE '%' + LOWER(@name) + '%' AND G.Name LIKE '%' + LOWER(@genreName) + '%'
                    ORDER BY P.Id DESC
                    OFFSET ((@page-1) * @itemsPerPage) ROWS
                    FETCH NEXT @itemsPerPage ROWS ONLY
                    `)
            })
            .then((result) => {
                return this.getPageCount(itemsPerPage, filter)
                    .then((itemCount) => {
                        return this.getCount(filter)
                            .then((totalItemCount) => {
                                const pageCount = itemCount.recordset[0].itemCount;
                                return {
                                    data: result.recordset.map((record) => DbMapper.mapProject(record)),
                                    pageCount: pageCount,
                                    currentPage: page < pageCount ? Number.parseInt(page) : Number.parseInt(pageCount),
                                    itemCount: totalItemCount.recordset[0].Count
                                };
                            })

                    });

            });
    }

    getProjectById(id) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('id', DbConnection.sql.Int, id)
                    .query(`SELECT P.Id, P.Name, P.Description, P.GenreId, 
                        G.Name AS GenreName, P.Bpm,
                        P.UserEmail as UserEmail,
                        U.Username as Username

                        FROM Project P 
                        INNER JOIN Genre G ON P.GenreId = G.Id
                        INNER JOIN Users U ON U.Email = P.UserEmail
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
                    .input('userEmail', DbConnection.sql.NVarChar(50), project.userEmail)
                    .query(`INSERT INTO Project(Name, GenreId, Description, Bpm, UserEmail)
            VALUES (@name, @genreId, @description, 60, @userEmail)`)
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