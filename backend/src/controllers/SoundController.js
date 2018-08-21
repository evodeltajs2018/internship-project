const SoundService = require("../services/SoundService");
const FileOpener = require('../utils/FileOpener');
const multiparty = require('multiparty');

class SoundController {
    constructor() {}

    getAll(req, res) {
        const page = req.query.page;
        const itemsPerPage = req.query.perpage;
        if (page && itemsPerPage) {
            return SoundService.getAll(page, itemsPerPage, {
                    name: req.query.name,
                    type: req.query.type
                })
                .then((data) => {
                    return res.json(data);
                });

        } else {
            return res.json({});
        }

    }

    addSound(req, res) {
        const form = new multiparty.Form();

        form.parse(req, (err, fields, files) => {
            const name = fields.name[0];
            const type = fields.type[0];
            const src = fields.src[0];
            const value = files.value[0];

            FileOpener(value)
                .then((data) => {
                    SoundService.addSound(name, type, src, data).then((result) => {
                        res.json(result);
                    }); 
                });
        });

        form.on('error', err => console.log(err));
        form.on('close', () =>  console.log('closed'));
    }

    deleteSound(req, res) {
        const { id } = req.params;
        return SoundService.delete(id).then((result) => {
            if (result) {
                return res.json(result);
            } else {
                return res.json({});
            }
        });
    }

    editSound(req, res) {
        const form = new multiparty.Form();

        form.parse(req, (err, fields, files) => {
            const { id } = req.params;
            const name = fields.name[0];
            const type = fields.type[0];
            const image = fields.image[0];
            const value = files.value[0];

            FileOpener(value)
                .then((data) => {
                    SoundService.editSound(id, name, type, image, data).then((result) => {
                        res.json(result);
                    });
                }); 
        });

        form.on('error', err => console.log(err));
        form.on('close', () =>  console.log('closed'));
    }

    getSoundById(req, res) {
        const { id } = req.params;
        SoundService.getSoundById(id).then((result) => {
            return res.json(result);
        });
    }

    getSoundDataById(req, res) {
        const { id } = req.params;
        SoundService.getSoundDataById(id).then((result) => {
            res.send(result);
        })
    }

    getSplicerSounds(req, res){
        return SoundService.getSplicerSounds().then((result) =>{
            return res.json(result);
        })
    }

    getSoundsByType(req, res){
        const { id } = req.params;
        return SoundService.getSoundsByType(id).then((result) =>{
            return res.json(result);
        })
    }

    getIconSrcById(req, res){
        let id = req.params.id;
        return SoundService.getIconSrcById(id).then((result) => {
            return res.json(result);
        })
    }
}

module.exports = new SoundController();