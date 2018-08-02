class SoundsService {
    constructor() {
        this.sounds = [
            {
                id: 1,
                name: "Clap",
                type: "Percutiondddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
            },
            {
                id: 2,
                name: "Beat",
                type: "Percution"
            },
            {
                id: 3,
                name: "Guitar wrum",
                type: "Guitar"
            },
            {
                id: 4,
                name: "Bass drop",
                type: "Bass"
            },
            {
                id: 5,
                name: "Swish",
                type: "Transition"
            },
        ];
    }

    getAll() {
        return this.sounds;
    }
}

module.exports = SoundsService;