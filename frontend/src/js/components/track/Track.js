import Component from "../Component";

import "./Track.scss";
import VolumeController from "../../views/splicer/engine/VolumeController";

class Track extends Component {
    constructor(container, sound, arrayBuffer, audioContext, mapSize) {
        super(container, "track");
        this.sound = sound;
        this.audioContext = audioContext;
        this.beatmap = [];
        this.mapSize = mapSize;
        this.decodeSound(arrayBuffer);
    }

    getEmptyMap() {
        let map = [];
        for (let i = 0; i < this.mapSize; i++) {
            if (Math.random() < 0.5) {
                map.push(1);
            } else {
                map.push(0);
            }
        }
        return map;
    }

    loadBeatmap() {
        this.beatmap = this.getEmptyMap();
    }

    decodeSound(arrayBuffer) {
        this.loadBeatmap();
        return this.audioContext.decodeAudioData(arrayBuffer, (buff) => {
            this.buffer = buff;
        })
    }

    playSound() {
        this.audioContext.resume();
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.buffer;

        this.source.connect(this.audioContext.destination);
        this.source.start(0);

    }

    render() {
        this.domElement.innerHTML = `<div class="volume"></div><div class="track-icon"><img src="/src/img/sound-types/` + this.sound.type.iconSrc + `"/><div>`;

        this.domElement.querySelectorAll(".track-icon").forEach(icon => {
            icon.addEventListener("click", () => {
                this.playSound();
                document.querySelectorAll(".track-icon").forEach((elem) => {
                    elem.style.background = '#1f1f1f';
                })
                icon.style.background = this.sound.type.colorType;
            })
        });
        this.volumeController = new VolumeController(
            this.domElement.querySelector(".volume"),
            this.beatmap,
            1,
            this.sound.type.colorType
        )
        this.volumeController.render();
    }
}

export default Track;