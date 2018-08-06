class SoundsService {
    constructor() {
        this.sounds = [
            {
                id: 1,
                name: "Clap1",
                type: {
                    id: 1,
                    name: "Percution"
                }
            },
            {
                id: 2,
                name: "Beat1",
                type: {
                    id: 1,
                    name: "Percution"
                }
            },
            {
                id: 3,
                name: "Guitar wrum1",
                type: {
                    id: 2,
                    name: "Guitar"
                }
            },
            {
                id: 4,
                name: "Bass drop1",
                type: {
                    id: 3,
                    name: "Bass"
                }
            },
            {
                id: 5,
                name: "Swish1",
                type: {
                    id: 4,
                    name: "Transition"
                }
            },
            {
                id: 6,
                name: "Clap2",
                type: {
                    id: 1,
                    name: "Percution"
                }
            },
            {
                id: 7,
                name: "Beat2",
                type: {
                    id: 1,
                    name: "Percution"
                }
            },
            {
                id: 8,
                name: "Guitar wrum2",
                type: {
                    id: 2,
                    name: "Guitar"
                }
            },
            {
                id: 9,
                name: "Bass drop2",
                type: {
                    id: 3,
                    name: "Bass"
                }
            },
            {
                id: 10,
                name: "Swish2",
                type: {
                    id: 4,
                    name: "Transition"
                }
            },
            {
                id: 11,
                name: "Clap3",
                type: {
                    id: 1,
                    name: "Percution"
                }
            },
            {
                id: 12,
                name: "Beat3",
                type: {
                    id: 1,
                    name: "Percution"
                }
            },
            {
                id: 13,
                name: "Guitar wrum3",
                type: {
                    id: 2,
                    name: "Guitar"
                }
            },
            {
                id: 14,
                name: "Bass drop3",
                type: {
                    id: 3,
                    name: "Bass"
                }
            },
            {
                id: 15,
                name: "Swish3",
                type: {
                    id: 4,
                    name: "Transition"
                }
            },

        ];
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

module.exports = SoundsService;