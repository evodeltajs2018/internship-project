import SoundRepository from "../../repositories/SoundRepository";

class SoundLoader {
    constructor() {
    
    }

    getSoundsWithIds(soundIds) {
        let promises = [];
        for (let i = 0; i < soundIds.length; i++) {
            promises.push(SoundRepository.getSoundById(soundIds[i]));
        }
        return Promise.all(promises)
        .then(result => {
            this.sounds = result;
            return result.map(item => SoundRepository.getSoundDataById(item.byteArray.id));
        })
        .then((data) => {
            return Promise.all(data).then(responses => {
                this.arrayBuffer = responses;
            })
        })
    }

    getSounds() {
        return SoundRepository.getSplicerSounds()
            .then((data) => {
                this.sounds = data;
                return data.map(item => SoundRepository.getSoundDataById(item.byteArray.id));
            })
            .then((data) => {
                return Promise.all(data).then(responses => {
                    this.arrayBuffer = responses;
                })
            });
    }

}

export default SoundLoader;