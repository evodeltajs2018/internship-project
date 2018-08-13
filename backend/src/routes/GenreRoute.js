const GenreController = require("../controllers/GenreController");

class GenreRoute {
    constructor(app) {
        this.app = app;

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/genres", (req, res) => {
            GenreController.getAllGenres(res)
        });

        this.app.get("/genres/:id", (req, res) => {
            GenreController.getGenreById(req, res);
        });
    }
}

module.exports = GenreRoute;


