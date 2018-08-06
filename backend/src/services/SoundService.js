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
                name: 'troczz'
            },
            { 
                id: 5,
                name: 'bass'
            },
            { 
                id: 6,
                name: 'guitar'
            }
        ]
    }

    addSounds(data) {
        this.sounds.push({ 
            id: this.sounds.length + 1,
            name: data.name,
            type: { id: data.type, name: this.getTypesById(data.type)[0].name } 
        });
        return this.sounds;
    }

    editSound(data, paramId) {
        const insert = {
                id: parseInt(paramId),
                name: data.name,
                type: { id: data.type, name: this.getTypesById(data.type)[0].name }
        }
        this.sounds[paramId - 1] = insert;
    }

    getSoundById(id) {
        return this.sounds.filter(sound => id == sound.id);
    }

    getTypesById(id) {
        return this.types.filter(type => id == type.id);
    }

    getTypes() {
        return this.types;
    }
}

module.exports = new SoundService();