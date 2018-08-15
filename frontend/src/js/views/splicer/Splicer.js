import Component from "../../components/Component";
import Track from "../../components/track/Track";
import WaveForm from "../../components/waveform/WaveForm";
import Engine from "./engine/Engine";
import SoundLoader from "./sound_loader/SoundLoader";
import SplicerMatrix from "./matrix/SplicerMatrix";

class Splicer extends Component {
    constructor(container, projectId) {
        super(container, "splicer");

        this.audioContext = new AudioContext();
        this.projectId = projectId;
        this.mapSize = 32;
        this.setup();
    }

    setup() {
        this.domElement.innerHTML = `
            <div class="splice-header"></div>
            <div class="splicer-main"></div>
        `;
        this.engine = new Engine(this.domElement.querySelector(".splice-header"), this.audioContext, this.mapSize);
        this.engine.render();
    }


    render() {
        this.domElement.querySelector(".splicer-main").innerHTML = `
            <div class="tracks-bar"></div>
            <div class="matrix"></div>
        `;

        this.soundLoader = new SoundLoader(document.querySelector(".tracks-pattern"));
        
        this.soundLoader.onLoad = () => {

            if (this.soundLoader.sounds) {
                let tracks = [];
                
                for (let i = 0; i < this.soundLoader.sounds.length; i++) {
                    let track = new Track(
                        document.querySelector(".tracks-bar"),
                        this.soundLoader.sounds[i],
                        this.soundLoader.arrayBuffer[i],
                        this.audioContext,
                        this.mapSize
                    );
                    track.render();
                    tracks.push(track);   
                }
                this.matrix = new SplicerMatrix(document.querySelector(".matrix"), tracks);
                this.engine.tracks = tracks;
                this.matrix.render();
            }
        }
        
    }
}

export default Splicer;