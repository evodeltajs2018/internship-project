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
        
        this.types = [
            { 
                id: 1,
                name: 'beep'
            },
            { 
                id: 2,
                name: 'boop'
            },
            { 
                id: 3,
                name: 'poop'
            },
            { 
                id: 4,
                name: 'troc'
            }
        ]
    }

    addSounds(data) {
        this.sounds.push({ 
                            id: this.sounds.length + 1,
                            name: data.name,
                            type: {id: data.type, name: 'Toate, for now'} 
                        });
        console.log(this.sounds);
        return this.sounds;
    }

    getTypes() {
        return this.types;
    }

    getSoundById(id) {
        return this.sounds.filter(sound => id == sound.id);
        /* for (let i = 0; i < this.sounds.length; i++) {
            if (i == id - 1) {
                return this.sounds[id - 1];
            }
        }
        return 0; */
    }
}

module.exports = SoundService;