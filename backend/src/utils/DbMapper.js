class DbMapper {
    static mapSound(sound) {
        return {
            id: sound.Id,
            name: sound.Name,
            type: {
                id: sound.TypeId,
                name: sound.TypeName,
                iconSrc: sound.IconSrc,
                colorType: sound.ColorType
            },
            image: sound.image,
            byteArray:{
                id: sound.ByteArrayId,
                value: sound.ByteArray
            }
        }
    }

    static mapBeatmap(beatmap) {
        return {
            id: beatmap.Id,
            projectId: beatmap.ProjectId,
            soundId: beatmap.SoundId,
            map: beatmap.Map.split(",").map(beat => Number.parseInt(beat))
        }
    }

    static mapType(type) {
        return {
            id: type.Id,
            name: type.Name,
            color: type.ColorType,
            src: type.IconSrc
        }
    }

    static mapSoundSplicer(sound){
        return{
            id: sound.Id,
            name: sound.Name,
            type:{
                id: sound.TypeId,
                name: sound.TypeName,
                iconSrc: sound.IconSrc,
                colorType: sound.ColorType
            },
            image: sound.Image,
            byteArray:{
                id: sound.ByteArrayId,
                value: sound.ByteArray
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
            description: project.Description,
            bpm: project.Bpm
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