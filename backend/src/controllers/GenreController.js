const GenreService = require("../services/GenreService");

class GenreController {
    constructor() {
    }

    getAllGenres(req, res) {
       return GenreService.getAllGenres().then((data) => {
            return res.json(data);
        });
    }

    getGenreById(req, res) {
        return GenreService.getGenreById(req.params.id).then((data) => {
            return res.json(data);
        });
    }
}

module.exports = new GenreController();