const AuthenticationController = require("../controllers/AuthenticationController");

class AuthenticationRoute{
    constructor(app){
        this.app = app;

        this.initRoutes();
    }

    initRoutes(){
        this.app.post("/register", (req, res)=>{
            AuthenticationController.register(req,res);
        });
        this.app.post("/login", (req, res)=>{
            AuthenticationController.login(req,res);
        });
        this.app.put("/edit", (req, res)=>{
            AuthenticationController.edit(req,res);
        });

    }

}

module.exports = AuthenticationRoute;
