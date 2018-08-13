import Component from "../Component";
import SoundTypeRepository from "../../repositories/SoundTypeRepository";
import "./SoundSplicer.scss";

class SoundSplicer extends Component{
    constructor(container, sound){
        super(container, "sound");
        this.sound = sound;
    }

    render(){
        this.domElement.innerHTML=`<img src="${this.sound.type.iconSrc}" />`;
    }
}

export default SoundSplicer;