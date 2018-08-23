const SoundController = require("../controllers/SoundController");
const jwt = require('jsonwebtoken');
const config = require("../config/config");
const TokenService = require("../services/TokenService");

class SoundRoute {
    constructor(app) {
        this.app = app;

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/sounds/:id", TokenService.verifyToken, TokenService.isAdmin, (req, res) => {
            jwt.verify(req.token, config.secret, (err, auth) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    SoundController.getSoundById(req, res);
                }
            });
        });

        this.app.post("/sounds", TokenService.verifyToken, TokenService.isAdmin, (req, res) => {
            jwt.verify(req.token, config.secret, (err, auth) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    SoundController.addSound(req, res);
                }
            });
        });

        this.app.put("/sounds/:id", TokenService.verifyToken, TokenService.isAdmin, (req, res) => {
            jwt.verify(req.token, config.secret, (err, auth) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    SoundController.editSound(req, res);
                }
            })

        });

        this.app.get("/sounds", TokenService.verifyToken, TokenService.isAdmin, (req, res) => {
            jwt.verify(req.token, config.secret, (err, auth) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    SoundController.getAll(req, res);
                }
            })

        });

        this.app.delete("/sounds/:id", (req, res) => {
                return SoundController.deleteSound(req, res);
        });

        this.app.get("/sounds/audio/:id", TokenService.verifyToken, TokenService.isAdmin, (req, res) => {
            jwt.verify(req.token, config.secret, (err, auth) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    SoundController.getSoundDataById(req, res);
                }
            })

        });

    }
}

module.exports = SoundRoute;
