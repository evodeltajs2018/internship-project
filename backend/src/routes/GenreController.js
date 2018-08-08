const GenreService = require("../services/GenreService");
const bodyParser = require('body-parser');

class GenreController {
    constructor(app) {
        this.app = app;
        
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/genres", (req, res) => {
            res.json([GenreService.getAllGenres()]);
		});

        this.app.get("/genre/:id", (req, res) => {
            res.json([GenreService.getGenreById(req.params.id)][0][0]);
        });

        this.app.post("/genre", (req, res) => {
            res.json([GenreService.addGenre(req.body)]);
        });
        
        this.app.post("/genre/:id", (req, res) => {
            res.json([GenreService.editGenre(req.body, req.params.id)]);
        });

		this.app.delete("/genre/:id", (req, res) => {
            res.json([GenreService.delete(id)]);
		});
    }
}

module.exports = GenreController;
