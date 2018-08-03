class SoundsService {
    constructor() {
        this.sounds = [
            {
                id: 1,
                name: "Clap",
                type: {
                    id: 1,
                    name: "Percution"
                }
            },
            {
                id: 2,
                name: "Beat",
                type: {
                    id: 1,
                    name: "Percution"
                }
            },
            {
                id: 3,
                name: "Guitar wrum",
                type: {
                    id: 2,
                    name: "Guitar"
                }
            },
            {
                id: 4,
                name: "Bass drop",
                type: {
                    id: 3,
                    name: "Bass"
                }
            },
            {
                id: 5,
                name: "Swish",
                type: {
                    id: 4,
                    name: "Transition"
                }
            },
            {
                id: 6,
                name: "Clap",
                type: {
                    id: 1,
                    name: "Percution"
                }
            },
            {
                id: 7,
                name: "Beat",
                type: {
                    id: 1,
                    name: "Percution"
                }
            },
            {
                id: 8,
                name: "Guitar wrum",
                type: {
                    id: 2,
                    name: "Guitar"
                }
            },
            {
                id: 9,
                name: "Bass drop",
                type: {
                    id: 3,
                    name: "Bass"
                }
            },
            {
                id: 10,
                name: "Swish",
                type: {
                    id: 4,
                    name: "Transition"
                }
            },
            {
                id: 11,
                name: "Clap",
                type: {
                    id: 1,
                    name: "Percution"
                }
            },
            {
                id: 12,
                name: "Beat",
                type: {
                    id: 1,
                    name: "Percution"
                }
            },
            {
                id: 13,
                name: "Guitar wrum",
                type: {
                    id: 2,
                    name: "Guitar"
                }
            },
            {
                id: 14,
                name: "Bass drop",
                type: {
                    id: 3,
                    name: "Bass"
                }
            },
            {
                id: 15,
                name: "Swish",
                type: {
                    id: 4,
                    name: "Transition"
                }
            },
          
        ];
    }

    getAll() {
        return this.sounds;
    }

    delete(id) {
        for (let i = 0; i < this.sounds.length; i++) {
            if (this.sounds[i].id == id) {
                this.sounds.splice(i, 1);
                return this.getAll();
            }
        }
        return false;
       
    }
}

module.exports = SoundsService;