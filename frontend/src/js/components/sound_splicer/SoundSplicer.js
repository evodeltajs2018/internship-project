import Component from "../Component";
import SoundTypeRepository from "../../repositories/SoundTypeRepository";
import "./SoundSplicer.scss";

class SoundSplicer extends Component{
    constructor(container, sound){
        super(container, "sound");
        this.sound = sound;
    }

    getSoundTypeImage(){
        SoundTypeRepository.getTypeById(this.sound.type.id)
        .then(response => {
            document.querySelector('#name').value = response.name;
            document.querySelector('#type').value = response.type.id;
        });
    }
    render(){
        this.domElement.innerHTML=`<img src="/src/img/sound-types/voice.png" />`;
    }
}

export default SoundSplicer;