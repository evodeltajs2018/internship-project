const DbConnection = require("../dbConnection/Connection");
const DbMapper = require("../utils/DbMapper");

class GenreService {
    constructor() {
    }

    getAllGenres() {
        return DbConnection.executeQuery(`
            SELECT Id, Name 
            FROM genre
            ORDER BY Name
            `)
            .then((result) => {
                return result.recordset.map((record) => DbMapper.mapGenre(record));
            });
    }

    getGenreById(id) {
        return DbConnection.executeQuery(`
        SELECT Id, Name 
        FROM genre
		WHERE Id LIKE '${id}'
        `)
            .then((result) => {
                return result.recordset.map((record) => DbMapper.mapGenre(record));
            });
    }
}

module.exports = new GenreService();