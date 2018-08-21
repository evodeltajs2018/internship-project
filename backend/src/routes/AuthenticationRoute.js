class AuthenticationRoute{
    constructor(app){
        this.app = app;

        this.initRoutes();
    }

    initRoutes(){
        this.app.post("/register", AuthenticationController.register);

        this.app.post("/login", AuthenticationController.login);
    }

}