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

    getGenresById(id) {
         for (let i = 0; i < this.genres.length; i++) {
            if(this.genres[i].id == id) {
                return this.genres[i];
            }
         }
        return null;
    }
}

module.exports = GenreService;