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
            },
            { 
                id: 5,
                name: "Project Title 1",
                type: { id: 1, name: "Rock"}
            },
            {
                id: 6,
                name: "Project Title 2",
                type: { id: 2, name: "Manelica"}
            },
            {
                id: 7,
                name: "Project Title 3",
                type: { id: 3, name: "Rapp"}
            },
            {
                id: 8,
                name: "Project Title 4",
                type: { id: 4, name: "Pop"}
            },
            { 
                id: 9,
                name: "Project Title 1",
                type: { id: 1, name: "Rock"}
            },
            {
                id: 10,
                name: "Project Title 2",
                type: { id: 2, name: "Manelica"}
            },
            {
                id: 11,
                name: "Project Title 3",
                type: { id: 3, name: "Rapp"}
            },
            {
                id: 12,
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

    getItems(page, itemsPerPage) {
        let tempData = new Array();
        for (let i = (page - 1) * itemsPerPage; this.sounds[i] && i < page * itemsPerPage; i++) {
            tempData.push(this.sounds[i]);
        }
        return tempData;
    }

    getPageCount(itemsPerPage) {
        return Math.ceil(this.sounds.length / itemsPerPage);
    }

    getAll(page, itemsPerPage) {
        return {
            data: this.getItems(page, itemsPerPage),
            pageCount: this.getPageCount(itemsPerPage),
            currentPage: page,
            itemCount: this.sounds.length
        }
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

module.exports = new SoundService();