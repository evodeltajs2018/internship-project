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
}

module.exports = DbMapper;