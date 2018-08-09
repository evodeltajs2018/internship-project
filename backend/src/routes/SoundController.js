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
        let sound = req.body, buf = Buffer.from(JSON.stringify(req.body.value));
        SoundService.addSound(sound, buf).then((result) => {
            res.json(result);
        })
    }

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
            console.log(err, fields, files);
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
            console.log(result);
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
        this.app.get("/sound/:id", (req, res) => {
            this.getSoundById( req, res);
        });

        this.app.get("/sound/audio/:id", (req, res) => {
            this.getSoundDataById(req, res);
        });

        this.app.post("/sound", (req, res) => {
            // #1 convert the string to a node buffer
            // #2 save with mssql the buffer
            const buf = Buffer.from(JSON.stringify(req.body.value));
            console.log(buf);
            //console.log(buf.toString('binary'));

            this.addSound(req, res);
        });

        this.app.put("/sound/:id", (req, res) => {
            // const buf = Buffer.from(JSON.stringify(req.body.value));
            // console.log(buf);
            //res.json([SoundService.editSound(req.body, req.params.id)]);
            this.editSound(req, res);
        });

        this.app.get("/sound", (req, res) => {
            this.getTypes(req, res);
        });

        this.app.get("/sounds", (req, res) => {
            this.getAll(req, res);
        });

        this.app.delete("/sound/:id", (req, res) => {
            this.deleteSound(req, res);
        });
    }
}

module.exports = SoundController;
