const GenreService = require("../services/GenreService");
const bodyParser = require('body-parser');

class GenreController {
    constructor(app) {
        this.app = app;

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.initRoutes();
    }

    getAllGenres(res) {
        GenreService.getAllGenres().then((data) => {
            res.json(data);
        });
    }

    getGenreById(req, res) {
        GenreService.getGenreById(req.params.id).then((data) => {
            res.json(data);
        });
    }

    initRoutes() {
        this.app.get("/genres", (req, res) => {
            this.getAllGenres(res);
        });

        this.app.get("/genres/:id", (req, res) => {
            this.getGenreById(req, res);
        });
    }
}

module.exports = GenreController;