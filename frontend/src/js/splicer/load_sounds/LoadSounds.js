import SoundRepository from "../../repositories/SoundRepository";
import Component from "../../components/Component";
import SoundSplicer from "../../components/sound_splicer/SoundSplicer";

class LoadSounds extends Component{
    constructor(container){
        super(container,"sounds-bar");
        this.sounds = null;

        this.getSounds();
    }

    getSounds(){
        SoundRepository.getSplicerSounds().then((data)=>{
            this.sounds = data;
            this.render();
        })
    }

    render(){
        if(this.sounds){
            for (let sound of this.sounds){
                console.log(this.sound);
                this.sound = new SoundSplicer(document.querySelector(".sounds-bar"), sound);
                this.sound.render();
            }
        }
        
    }
}

export default LoadSounds;