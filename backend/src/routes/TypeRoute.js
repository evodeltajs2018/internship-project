const TypeController = require("../controllers/TypeController");

const jwt = require('jsonwebtoken');
const config = require("../config/config");
const TokenService = require("../services/TokenService");
class TypeRoute {
    constructor(app) {
        this.app = app;

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/types", TokenService.verifyToken, TokenService.isAdmin, (req, res) => {
            jwt.verify(req.token, config.secret, (err, auth) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    TypeController.getAllTypes(req, res);
                }
            })

        });

        this.app.get("/typeall", TokenService.verifyToken, TokenService.isAdmin, (req, res) => {
            jwt.verify(req.token, config.secret, (err, auth) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    TypeController.getAll(req, res);
                }
            })

        });

        this.app.get("/types/:id", TokenService.verifyToken, TokenService.isAdmin, (req, res) => {
            jwt.verify(req.token, config.secret, (err, auth) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    TypeController.getTypeById(req, res);
                }
            })
        });

        this.app.post("/types", TokenService.verifyToken, TokenService.isAdmin, (req, res) => {
            jwt.verify(req.token, config.secret, (err, auth) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    TypeController.addType(req, res);
                }
            })
        });

        this.app.put("/types/:id", TokenService.verifyToken, TokenService.isAdmin, (req, res) => {
            jwt.verify(req.token, config.secret, (err, auth) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    TypeController.editType(req, res);
                }
            })
        });

        this.app.delete("/types/:id", (req, res) => {
            return TypeController.deleteType(req, res);
        });
    }
}

module.exports = TypeRoute;