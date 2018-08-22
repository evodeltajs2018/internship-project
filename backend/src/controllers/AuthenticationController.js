const AuthenticationService = require("../services/AuthenticationService");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../src/config/config');

class AuthenticationController{
    constructor(){
        
    }

    register(req,res){
        if (!req.body.email || !req.body.password || !req.body.username) {
            return res.status(400).send("Please fill out the required fields.");
        } else {
            return AuthenticationService.verifyEmail(req.body.email)
            .then((result) => {
                if(result){
                    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
                    const data = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        username: req.body.username,
                        email: req.body.email,
                        hashedPassword: hashedPassword
                    };
                    return data;
                }else{
                    throw "Email already in use.";
                }
            })
            .then((data) => {
                return AuthenticationService.register(data);
            }).then((result) => {
                if (result) {
                    const user = {
                        id: result,
                        email: req.body.email
                    }
                    jwt.sign(user, config.secret, {expiresIn: 1200}, (err,token) =>{
                        return res.json({ token });
                    })
                } else {
                    throw "There was a problem registering the user";
                }

            })
            .catch(error => {
                return res.status(500).send(error);
            })
            
        }
    }
}

module.exports = new AuthenticationController();