import Component from "../../../components/Component";
import Button from "../../../components/button/Button";
import "./Engine.scss";

const defaultOptions = {
    play: true,
    clear: true,
    bpm: true,
    save: true
}

class Engine extends Component {
    constructor(container, audioContext, mapSize, saveHandler, bpm, options = defaultOptions) {
        super(container, "splicer-engine");
        this.saveHandler = saveHandler;
        this.audioContext = audioContext;
        this.bpm = bpm;
        this.mapSize = mapSize;
        this.currentIndex = 0;
        this.tracks = [];
        this.isPlaying = false;
        this.options = options;
        this.analyser =  this.audioContext.createAnalyser();
        window.addEventListener("popstate", () => this.handlePageLeave());
    }

    handlePageLeave() {
        if (this.isPlaying) {
            this.stop();
            window.removeEventListener("popstate", this.handlePageLeave);
        }
    }

    changeBpm(bpm) {
        this.bpm = bpm;
    }

    getScheduleTime() {
        return (60000 / 4) / this.bpm;
    }

    createPlayEvent() {
        let event = new CustomEvent("playbeat", {
            bubbles: false,
            detail: { index: this.currentIndex }
        });
        document.dispatchEvent(event);
    }

    createStopEvent() {
        let event = new CustomEvent("stop", {
            bubbles: false
        });
        document.dispatchEvent(event);
    }

    createClearEvent() {
        let event = new CustomEvent("clear", {
            bubbles: false
        });
        document.dispatchEvent(event);
    }

    playSound(track, nextNoteTime) {
        track.beatmap.source = this.audioContext.createBufferSource();
        let source = track.beatmap.source;
        let buffer = track.buffer;
        source.buffer = buffer;

        let gainNode = this.audioContext.createGain();
        let volume = track.volumeController? track.volumeController.volume : 1;
        gainNode.gain.value = volume;

        this.analyser.smoothingTimeConstant = 0.6;
        source.connect(gainNode);
        gainNode.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        source.start(nextNoteTime);
    }

    playBeatmap() {
        this.createPlayEvent();
        let nextNoteTime = this.audioContext.currentTime;
        while (nextNoteTime < this.audioContext.currentTime + 0.1) {
            for (let track of this.tracks) {
                if (track.beatmap[this.currentIndex]) {
                    this.playSound(track, nextNoteTime);
                }
            }
            this.currentIndex++;
            if (this.currentIndex >= this.mapSize) {
                this.currentIndex = 0;
            }
            nextNoteTime += this.getScheduleTime() / 1000;
        }
        this.timeout = setTimeout(() => this.playBeatmap(), this.getScheduleTime());
    }

    stopSources() {
        for (let track of this.tracks) {
            if (track.beatmap.source) {
                track.beatmap.source.stop(0);
            }
        }
    }

    play() {
        this.playButton.unrender();
        this.renderStopButton();
        this.playBeatmap();
        this.isPlaying = true;
        if (this.cardPlayHandler) {
            this.cardPlayHandler();
        }
    }

    stop() {
        this.stopButton.unrender();
        this.renderPlayButton();

        this.createStopEvent();
        this.stopSources();
        clearTimeout(this.timeout);
        this.currentIndex = 0;
        this.isPlaying = false;
    }

    clear() {
        if (this.isPlaying) {
            this.stop();
        }
        for (let track of this.tracks) {
            track.clearBeatmap();
        }
        this.createClearEvent();
    }

    renderPlayButton() {
        this.playButton = new Button(
            this.domElement.querySelector(".play-buttons"),
            `<i class="fas fa-play"></i>`,
            "play-button"
        );
        this.playButton.render();
        this.domElement.querySelector(".play-button").addEventListener(
            "click",
            () => this.play());
    }

    renderStopButton() {
        this.stopButton = new Button(
            this.domElement.querySelector(".play-buttons"),
            `<i class="fas fa-stop"></i>`,
            "stop-button"
        );
        this.stopButton.render();
        this.domElement.querySelector(".stop-button").addEventListener(
            "click",
            () => this.stop());
    }

    renderSaveButton() {
        this.saveButton = new Button(
            this.domElement.querySelector(".save-btn"),
            `<i class="fas fa-save"></i>Save`,
            "save-button"
        );
        this.saveButton.render();
        this.domElement.querySelector(".save-btn").addEventListener(
            "click",
            () => this.saveHandler());
    }

    renderClearButton() {
        this.clearButton = new Button(
            this.domElement.querySelector(".clear-btn"),
            `<i class="fas fa-times"></i>Clear`,
            "clear-button"
        );
        this.clearButton.render();
        this.domElement.querySelector(".clear-btn").addEventListener(
            "click",
            () => this.clear());
    }

    checkBpm(event) {
        if (event.target.valueAsNumber > 300) {
            this.domElement.querySelector("#bpm-input").value = 60;
        }
        return false;
    }

    addBpmEvents() {
        this.domElement.querySelector("#bpm-input").addEventListener("change",
            (event) => {
                this.changeBpm(event.target.value);
            });

        this.domElement.querySelector("#bpm-input").addEventListener("input",
            (event) => {
                this.checkBpm(event);
            });
    }

    render() {
        this.domElement.innerHTML = `
            <div class="splicer-header-left">
                <div class="play-buttons"></div>
                ${
                 this.options.bpm ? `<label>BPM:</label>
                
                <input type="number" min="10" max="300" id="bpm-input" value="${this.bpm}">` : ""
                }
                
            </div>
            
            <div class="splicer-header-right">
                <div class="clear-btn"></div>
                <div class="save-btn"></div>
            </div>
        `;
        this.options.play ? this.renderPlayButton() : null;
        this.options.bpm ? this.addBpmEvents() : null;
        this.options.save ? this.renderSaveButton() : null;
        this.options.clear ? this.renderClearButton() : null;

    }
}

export default Engine;