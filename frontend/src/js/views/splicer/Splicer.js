import Component from "../../components/Component";
import Track from "../../components/track/Track";
import WaveForm from "../../components/waveform/WaveForm";
import Engine from "./engine/Engine";
import SoundLoader from "../../services/sound_loader/SoundLoader";
import RelatedSoundLoader from "../../services/sound_loader/RelatedSoundLoader";
import SplicerMatrix from "./matrix/SplicerMatrix";
import "./Splicer.scss";
import RelatedTrack from "../../components/related_track/RelatedTrack";

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
            <div class="splicer-sample-selector"><div class="splicer-sample-header"></div><div class="splicer-sample-tracks"></div></div>
        `;
        this.engine = new Engine(this.domElement.querySelector(".splice-header"), this.audioContext, this.mapSize);
        this.engine.render();
    }

    relatedTracksLoader(track) {
        this.relatedSoundLoader.getRelatedSound(track.sound.type.id);
        this.relatedSoundLoader.onLoad = () => {
            for (let i = 0; i < this.relatedSoundLoader.relatedSounds.length; i++) {
                let relatedTrack = new RelatedTrack(document.querySelector(".splicer-sample-tracks"),
                    this.relatedSoundLoader.relatedSounds[i], this.relatedSoundLoader.arrayBuffer[i], this.audioContext);
                relatedTrack.createSelectRelatedTrackEvent();
                if (relatedTrack.sound.byteArray.id == track.sound.byteArray.id) {
                    relatedTrack.domElement.style.background = track.sound.type.colorType;
                }

                relatedTrack.domElement.addEventListener("click", () => {
                    track.sound = relatedTrack.sound;
                    track.buffer = relatedTrack.buffer;
                    this.waveForm.render();
                    document.querySelectorAll(".related-sample").forEach((item) => {
                        item.style.background = "grey";
                    })
                    relatedTrack.domElement.style.background = track.sound.type.colorType;
                    relatedTrack.playSound();

                })
                relatedTrack.render();
            }
        }
    }


    render() {
        this.domElement.querySelector(".splicer-main").innerHTML = `
            <div class="tracks-bar"></div>
            <div class="matrix"></div>
        `;

        this.soundLoader = new SoundLoader();

        this.soundLoader.onLoad = () => {

            if (this.soundLoader.sounds) {
                let tracks = [];

                this.relatedSoundLoader = new RelatedSoundLoader();
                for (let i = 0; i < this.soundLoader.sounds.length; i++) {
                    let track = new Track(
                        document.querySelector(".tracks-bar"),
                        this.soundLoader.sounds[i],
                        this.soundLoader.arrayBuffer[i],
                        this.audioContext,
                        this.mapSize,
                        i
                    );

                    track.domElement.addEventListener("click", () => {
                        document.querySelector(".splicer-sample-tracks").innerHTML = "";
                        this.relatedTracksLoader(track);
                    })

                    track.render();
                    tracks.push(track);
                }



                this.matrix = new SplicerMatrix(document.querySelector(".matrix"), tracks);
                this.engine.tracks = tracks;
                this.matrix.render();

                this.waveForm = new WaveForm(document.querySelector(".splicer-sample-header"));





            }
        }



    }
}

export default Splicer;