const GenreController = require("../controllers/GenreController");
const jwt = require('jsonwebtoken');
const config = require("../config/config");
const TokenService = require("../services/TokenService");

class GenreRoute {
    constructor(app) {
        this.app = app;

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/genres", TokenService.verifyToken, (req, res) => {
            jwt.verify(req.token, config.secret, (err, auth) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    GenreController.getAllGenres(req, res);
                }
            })
        });

        this.app.get("/genres/:id", (req, res) => {
            GenreController.getGenreById(req, res);
        });
    }
}

module.exports = GenreRoute;


