const DbConnection = require("../dbConnection/Connection");
const DbMapper = require("../utils/DbMapper");

class ProjectService {
    constructor() {
        this.fromwhere = `
        FROM Project P INNER JOIN Genre G On P.GenreId = G.Id
        WHERE LOWER(P.Name) LIKE '%' + LOWER(@name) + '%' AND G.Name LIKE '%' + LOWER(@genreName) + '%'
        `;
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
                    SELECT P.Id, P.Name, P.Description, P.GenreId, G.Name AS GenreName 
                    ${this.fromwhere}
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
    // getAllProjects() {
    //     return DbConnection.executePoolRequest()
    //         .then(pool => {
    //             return pool.query(`
    //         SELECT P.Id, P.Name, P.Description, P.GenreId, G.Name AS GenreName
    //         FROM Project P INNER JOIN Genre G ON P.GenreId = G.Id
    //         ORDER BY P.Id DESC`)
    //         })
    //         .then((result) => {
    //             return result.recordset.map((record) => {
    //                 return DbMapper.mapProject(record)
    //             });
    //         });
    // }

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