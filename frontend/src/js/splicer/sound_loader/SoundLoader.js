import SoundRepository from "../../repositories/SoundRepository";

class SoundLoader{
    constructor() {
        this.getSounds();
    }

    getSounds() {
        return SoundRepository.getSplicerSounds()
        .then((data) => {
            this.sounds = data;
            return data.map(item => SoundRepository.getSoundDataById(item.byteArray.id));
        })
        .then((data)=>{
            return Promise.all(data).then(responses => {
                this.arrayBuffer = responses;
            })
        })
        .then(()=>{
            this.onLoad();
        })
    }

}

export default SoundLoader;