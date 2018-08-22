const AuthenticationService = require("../services/AuthenticationService");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../src/config/config');

class AuthenticationController {
    constructor() {

    }

    register(req, res) {
        if (!req.body.email || !req.body.password || !req.body.username) {
            return res.status(400).send({ error: "Please fill out the required fields." });
        } else {
            return AuthenticationService.verifyIfEmailExists(req.body.email)
                .then((result) => {
                    if (result) {
                        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
                        const data = {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            username: req.body.username,
                            email: req.body.email,
                            hashedPassword: hashedPassword
                        };
                        return data;
                    } else {
                        throw (res.status(400).send({ error: "Email already in use." }));
                    }
                })
                .then((data) => {
                    return AuthenticationService.register(data);
                }).then((result) => {
                    if (result) {
                        const user = {
                            id: result.Id,
                            roleId: result.RoleId,
                            firstName: result.FirstName,
                            lastName: result.LastName,
                            email: req.body.email
                        }
                        jwt.sign(user, config.secret, { expiresIn: 1200 }, (err, token) => {
                            return res.json({ token });
                        })
                    } else {
                        throw (res.status(400).send({ error: "There was a problem registering the user" }));
                    }
                })
                .catch((err) => { return err; })
        }
    }

    login(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ error: "Please fill out the required fields." });
        } else {
            return AuthenticationService.checkEmail(req.body.email)
                .then((result) => {
                    if (result) {
                        return AuthenticationService.getHashedPasswordByEmail(req.body.email)
                            .then((result) => {
                                if (bcrypt.compareSync(req.body.password, result.Password)) {
                                    const user = {
                                        id: result.Id,
                                        roleId: result.RoleId,
                                        firstName: result.FirstName,
                                        lastName: result.LastName,
                                        email: req.body.email
                                    }
                                    jwt.sign(user, config.secret, { expiresIn: 1200 }, (err, token) => {
                                        return res.json({ token });
                                    })
                                } else {
                                    throw (res.status(400).send({ error: "Password does not match." }));
                                }
                            })
                    } else {
                        throw (res.status(400).send({ error: "There is no account with that email address." }));
                    }
                })
                .catch(err => { return err; })
        }

    }
}

module.exports = new AuthenticationController();