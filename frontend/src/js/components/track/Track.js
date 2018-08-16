import Component from "../Component";

import "./Track.scss";
import VolumeController from "../../views/splicer/engine/VolumeController";

class Track extends Component {
    constructor(container, sound, arrayBuffer, audioContext, mapSize, index) {
        super(container, "track");
        this.sound = sound;
        this.index = index;
        this.audioContext = audioContext;
        this.beatmap = [];
        this.mapSize = mapSize;
        this.decodeSound(arrayBuffer);
        document.addEventListener("rowselect", (event) => {
            if (event.detail.index === this.index) {
                console.log(document.querySelectorAll(`.track-icon`));
                let icons = document.querySelectorAll(`.track-icon`);
                for (let i = 0; i < icons.length; i++) {
                    icons[i].style.background = '#1f1f1f';
                    if (i === this.index) {
                        icons[i].style.background = this.sound.type.colorType;
                        this.playSound();
                    }
                }
            }
        });
    }

    getEmptyMap() {
        let map = [];
        for (let i = 0; i < this.mapSize; i++) {
            map.push(0);
        }
        return map;
    }

    toggleBeat(index) {
        let beat = 1;
        if (this.beatmap[index]) {
            beat = 0;
        }
        this.beatmap[index] = beat;
    }

    loadBeatmap() {
        this.beatmap = this.getEmptyMap();
    }

    decodeSound(arrayBuffer) {
        this.loadBeatmap();
        return this.audioContext.decodeAudioData(arrayBuffer, (buff) => {
            this.buffer = buff;
            if (this.onBufferLoad) {
                this.onBufferLoad();
            }
        })
    }

    clearBeatmap() {
        this.beatmap = this.getEmptyMap();
    }

    createSelectRowEvent() {
        let event = new CustomEvent("trackselect", {
            bubbles: false,
            detail: { 
                index: this.index,
                track: this
            }
        });
        document.dispatchEvent(event);
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
                this.createSelectRowEvent();
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