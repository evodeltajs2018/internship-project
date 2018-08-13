const SoundService = require("../services/SoundService");

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
        let sound = req.body;
        return SoundService.addSound(sound).then((result) => {
            return res.json(result);
        })
    }

    deleteSound(req, res) {
        let id = req.params.id;
        return SoundService.delete(id).then((result) => {
            if (result) {
                return res.json(result);
            } else {
                return res.json({});
            }
        });
    }

    editSound(req, res) {
        let sound = req.body,
            id = req.params.id;
        return SoundService.editSound(sound, id).then((result) => {
            return res.json(result);
        });
    }

    getTypes(req, res) {
        return SoundService.getTypes().then((result) => {
            return res.json(result);
        });
    }

    getSoundById(req, res) {
        let id = req.params.id;
        return SoundService.getSoundById(id).then((result) => {
            return res.json(result);
        });
    }

    getSplicerSounds(req,res){
        return SoundService.getSplicerSounds().then((result) =>{
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