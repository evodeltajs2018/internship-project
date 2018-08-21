const AuthenticationService = require("../services/AuthenticationService");

class AuthenticationController{
    constructor(){
    }

    register(req,res){
        console.log(req.body);
        return AuthenticationService.verifyEmail(req.body.email)
        .then((result) => {
            if(result){
                let data = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    email: req.body.email
                };
                return data;
            }else{
                throw err;
            }
        })
        .then((data) => {
            var bcrypt = require('bcrypt');
            const saltRounds = 10;
            return bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
                data.hashedPassword = hash;
                return data;
            });
        })
        .then((data) => {
            return AuthenticationService.register(data);
        }).then((result) => {
            return res.json(result);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

module.exports = new AuthenticationController();