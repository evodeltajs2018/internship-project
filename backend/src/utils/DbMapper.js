class DbMapper {
    static mapSound(sound) {
        return {
            id: sound.Id,
            name: sound.Name,
            type: {
                id: sound.SoundTypeId,
                name: sound.TypeName
            }
        }
    }

    static mapProject(project) {
        return {
            id: project.Id,
            name: project.Name,
            genre: {
                id: project.GenreId,
                name: project.GenreName
            },
            description: project.Description
        }
    }

    static mapGenre(genre) {
        return {
            id: genre.Id,
            name: genre.Name
        }
    }
}

module.exports = DbMapper;