class GenreService {
    constructor() {
        this.genres = [
            {
                id: 1,
                name: "Rock"
            },
            {
                id: 2,
                name: "Pop"
            },
            {
                id: 3,
                name: "Electronic"
            },
            {
                id: 4,
                name: "Hip-Hop"
            },
            {
                id: 5,
                name: "Clasic"
            },
            {
                id: 6,
                name: "Dance"
            },
            {
                id: 7,
                name: "Jazz"
            },
        ]
    }

    getAllGenres() {
        return this.genres;
    }

    getGenreById(id) {
        return this.genres.filter(genre => id == genre.id);
    }

    addGenre(data) {
        const newGenre = {
            id: parseInt(paramId),
            name: data.name,
    }
        this.genres.push(newGenre);
        return this.genres[paramId - 1];
    }

    editGenre(data, paramId) {
        const newGenre = {
                id: parseInt(paramId),
                name: data.name,
        }
        this.genres[paramId - 1] = newGenre;

        return this.genres[paramId - 1];
    }

    deleteGenre(id) {
        for (let i = 0; i < this.genres.length; i++) {
            if (this.genres[i].id == id) {
                this.genres.splice(i, 1);
                return true;
            }
        }
        return false;

    }
}

module.exports = new GenreService();