//const sql = require("mssql");

class SoundController {
    constructor(app) {
        this.app = app;
        
        this.SoundService = require("../services/SoundService");
        this.service = new this.SoundService();

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/sound", (req, res) => {
            //this.getAll(req, res);
            res.json([this.service.getSounds()]);
            console.log(req);
        });

        this.app.get("/sound/:id", (req, res) => {
            res.json([this.service.getSoundById(req.params.id)]);
        });
    }
/* 
    getAll(req, res) {
        res.json([
            { id:1,title:"Project Title 1",genre:"Rock",description:"First example project card cause we need something to see but nothing it's ok" },
            { id:2,title:"Project Title 2",genre:"Rock",description:"Waaaao" }
        ]);
    } */

    getById(req, res) {
        for (let i = 0; i < req.length; i++) {
            if (req.params.id == i)
                return res.json();
        }
        //res.json([{rap: req.params.id}]);
    }
}

module.exports = SoundController;
