import SoundRepository from "../../repositories/SoundRepository";

class RelatedSoundLoader {
    constructor() {
    }

    getRelatedSound(typeId) {
        SoundRepository.getSoundsByType(typeId)
            .then((data) => {
                this.relatedSounds = data;
                return data.map(item => SoundRepository.getSoundDataById(item.byteArray.id));
            })
            .then((data) => {
                return Promise.all(data).then(responses => {
                    this.arrayBuffer = responses;
                })
            })
            .then(()=>{
                this.onLoad();
            })

    }

}

export default RelatedSoundLoader;