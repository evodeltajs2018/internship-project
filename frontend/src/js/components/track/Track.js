import Component from "../Component";
import "./Track.scss";

class Track extends Component {
    constructor(container, sound, arrayBuffer, audioContext) {
        super(container, "track");
        this.sound = sound;
        this.audioContext = audioContext;
        this.decodeSound(arrayBuffer);
    }

    decodeSound(arrayBuffer){
        this.audioContext.decodeAudioData(arrayBuffer,(buff) =>{
            this.buffer = buff;
        })
    }

    playSound(){
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.buffer;

        this.source.connect(this.audioContext.destination);
        this.source.start(0);
        
    }

    render() {
        this.domElement.innerHTML = `<img src="/src/img/sound-types/`+this.sound.type.iconSrc+`"/>`;

        this.domElement.addEventListener("click", () => {
            document.querySelectorAll(".track").forEach((elem) => {
                elem.style.background = '#1f1f1f';
            })
            this.domElement.style.background = this.sound.type.colorType;
        })

        this.domElement.addEventListener("click", () => {
          this.playSound();  
        })
    }
}

export default Track;