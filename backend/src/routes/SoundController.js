const SoundService = require("../services/SoundService");
const FileOpener = require('../utils/FileOpener');
const multiparty = require('multiparty');

class SoundController {
    constructor(app) {
        this.app = app;

        this.initRoutes();
    }

    getAll(req, res) {
        const page = req.query.page;
        const itemsPerPage = req.query.perpage;
        if (page && itemsPerPage) {
            SoundService.getAll(page, itemsPerPage).then((data) => {
                res.json(data);
            });

        } else {
            res.json({});
        }

    }

    addSound(req, res) {
        
        const form = new multiparty.Form();

        form.parse(req, (err, fields, files) => {
            const { id } = req.params;
            const name = fields.name[0];
            const type = fields.type[0];
            const value = files.value[0];

            FileOpener(value)
                .then((data) => {
                    SoundService.addSound(id, name, type, data).then((result) => {
                        res.json(result);
                    }); 
                });
        });

        form.on('error', err => console.log(err));
        form.on('close', () =>  console.log('closed'));
    }
        /* SoundService.addSound(sound, buf).then((result) => {
            res.json(result);
        })
    } */

    deleteSound(req, res) {
        let id = req.params.id;
        SoundService.delete(id).then((result) => {
            if (result) {
                res.json(result);
            } else {
                res.json({});
            }
        });
    }

    editSound(req, res) {

        const form = new multiparty.Form();

        form.parse(req, (err, fields, files) => {
            const { id } = req.params;
            const name = fields.name[0];
            const type = fields.type[0];
            const value = files.value[0];

            FileOpener(value)
                .then((data) => {
                    SoundService.editSound(id, name, type, data).then((result) => {
                        res.json(result);
                    }); 
                });
        });

        form.on('error', err => console.log(err));
        form.on('close', () =>  console.log('closed'));
    }

    getTypes(req, res) {
        SoundService.getTypes().then((result) => {
            res.json(result);
        });
    }

    getSoundById(req, res) {
        let id = req.params.id;
        SoundService.getSoundById(id).then((result) => {
            res.json(result);
        });
    }

    getSoundDataById(req, res) {
        const { id } = req.params;
        SoundService.getSoundDataById(id).then((result) => {
            res.send(result);
        })
    }

    initRoutes() {
        this.app.get("/sounds/:id", (req, res) => {
            this.getSoundById( req, res);
        });

        this.app.get("/sounds/audio/:id", (req, res) => {
            this.getSoundDataById(req, res);
        });

        this.app.post("/sounds", (req, res) => {
            this.addSound(req, res);
        });

        this.app.put("/sounds/:id", (req, res) => {
            this.editSound(req, res);
        });

        this.app.get("/types", (req, res) => {
            this.getTypes(req, res);
        });

        this.app.get("/sounds", (req, res) => {
            this.getAll(req, res);
        });

        this.app.delete("/sounds/:id", (req, res) => {
            this.deleteSound(req, res);
        });
    }
}

module.exports = SoundController;
