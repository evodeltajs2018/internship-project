class SoundService {
    constructor() {
        this.sounds = [
            { 
                id: 1,
                name: "Project Title 1",
                type: { id: 1, name: "Rock"}
            },
            {
                id: 2,
                name: "Project Title 2",
                type: { id: 2, name: "Manelica"}
            },
            {
                id: 3,
                name: "Project Title 3",
                type: { id: 3, name: "Rapp"}
            },
            {
                id: 4,
                name: "Project Title 4",
                type: { id: 4, name: "Pop"}
            }
        ]
    }

    getSounds() {
        return this.sounds;
    }

    getSoundById(id) {
        for (let i = 0; i < this.sounds.length; i++) {
            if (i == id - 1) {
                return this.sounds[id - 1];
            }
        }
        return 0;
    }
}

module.exports = SoundService;