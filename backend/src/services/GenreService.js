const DbConnection = require("../dbConnection/Connection");
const DbMapper = require("../utils/DbMapper");

class GenreService {
    constructor() {
    }

    getAllGenres() {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.query(`SELECT Id, Name FROM genre ORDER BY Name`)
            })
            .then((result) => {
                return result.recordset.map((record) => {
                    return DbMapper.mapGenre(record)
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    getGenreById(id) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('id', DbConnection.sql.Int, id)
                    .query(`SELECT Id, Name FROM genre WHERE Id LIKE @id`)
            })
            .then((result) => {
                return result.recordset.map((record) => {
                    return DbMapper.mapGenre(record)
                });
            });
    }
}

module.exports = new GenreService();