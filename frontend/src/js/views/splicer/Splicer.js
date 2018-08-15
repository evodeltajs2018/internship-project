import Component from "../../components/Component";
import SoundLoader from "../../splicer/sound_loader/SoundLoader";
import Track from "../../components/track/Track";
import WaveForm from "../../components/waveform/WaveForm";

class Splicer extends Component {
    constructor(container) {
        super(container, "splicer");

        this.audioContext = new AudioContext();

    }

    render() {
        this.domElement.innerHTML = `<div class="tracks-bar"></div><div class="matrix"></div>`;

        this.SoundLoader = new SoundLoader(document.querySelector(".matrix"));

        this.SoundLoader.onLoad = () => {
            if (this.SoundLoader.sounds) {
                for (let i = 0; i < this.SoundLoader.sounds.length; i++) {
                    var track = new Track(document.querySelector(".tracks-bar"), this.SoundLoader.sounds[i],
                        this.SoundLoader.arrayBuffer[i], this.audioContext);
                    track.render();
                }
                console.log(track.buffer);
                this.WaveForm = new WaveForm(document.querySelector(".splicer"),track);
                this.WaveForm.render();
            }
        }
        
    }
}

export default Splicer;