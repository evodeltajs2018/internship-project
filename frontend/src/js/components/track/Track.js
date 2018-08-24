import Component from "../Component";

import "./Track.scss";
import VolumeController from "../../views/splicer/engine/VolumeController";
import Debounce from "../../utils/Debounce";

class Track extends Component {
    constructor(container, sound, arrayBuffer, data) {
        super(container, "track");
        this.sound = sound;
        this.beatmap = data.beatmap? data.beatmap: this.getEmptyMap();
        this.beatmapId = data.beatmapId;
        this.index = data.index;
        this.audioContext = data.audioContext;
        this.mapSize = data.mapSize;
        this.engine = data.engine;
        this.initHandlers();
        this.addEventListeners();
        this.decodeSound(arrayBuffer);
    }

    addEventListeners() {
        window.addEventListener("popstate", () => {
            this.handlePageLeave();
        });
        this.addRowSelectListener();
    }

    initHandlers() {
        this.selectRowHandler = (event) => this.selectRow(event);
        this.debouncedPlayHandler = Debounce.debounce(() => this.playSound(), 500);
    }

    handlePageLeave() {
        document.removeEventListener("rowselect", this.selectRowHandler);
        window.removeEventListener("popstate", this.handlePageLeave);
    }

    addRowSelectListener() {
        document.addEventListener("rowselect", this.selectRowHandler);
    }

    selectRow(event) {
        let index = event.detail.index;
        if (index === this.index) {
            let icons = document.querySelectorAll(`.track-icon`);
            for (let i = 0; i < icons.length; i++) {
                icons[i].style.background = '#1f1f1f';
                if (i === this.index) {
                    icons[i].style.background = this.sound.type.colorType;
                    this.debouncedPlayHandler();
                }
            }
        }
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
        this.beatmap.source = this.audioContext.createBufferSource();
        let source = this.beatmap.source;
        let buffer = this.buffer;
        source.buffer = buffer;
        
        let gainNode = this.audioContext.createGain();
        gainNode.gain.value = this.volumeController.volume;

        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        source.start(0);
    }

    render() {
        this.domElement.innerHTML = `<div class="volume"></div><div class="track-icon"><img src="${this.sound.type.iconSrc}"/><div>`;

        this.domElement.querySelectorAll(".track-icon").forEach(icon => {
            icon.addEventListener("click", () => {
                this.createSelectRowEvent();
                this.debouncedPlayHandler();
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