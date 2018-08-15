import Component from "../../../components/Component";
import Button from "../../../components/button/Button";
import "./Engine.scss";

class Engine extends Component {
    constructor(container, audioContext, mapSize) {
        super(container, "splicer-engine");
        this.audioContext = audioContext;
        this.bpm = 60;
        this.mapSize = mapSize;
        this.currentIndex = 0;
        this.tracks = [];
        this.isPlaying = false;
        window.addEventListener("popstate", () => this.handlePageLeave())
    }

    handlePageLeave() {
        if (this.isPlaying) {
            
            this.stop();
            window.removeEventListener('popstate', this.handlePageLeave);
        }
    }

    changeBpm(bpm) {
        this.bpm = bpm;
    }

    getScheduleTime() {
        return (60000 / 4) / this.bpm;
    }

    playSound(track, nextNoteTime) {
        track.beatmap.source = this.audioContext.createBufferSource();
        let source = track.beatmap.source;
        let buffer = track.buffer;
        source.buffer = buffer;
        
        let gainNode = this.audioContext.createGain();
        gainNode.gain.value = track.volumeController.volume;

        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        source.start(nextNoteTime);
    }

    playBeatmap() {
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


    play() {
        this.audioContext.resume();
        this.playButton.unrender();
        this.renderStopButton();
        this.playBeatmap();
        this.isPlaying = true;
    }

    stop() {
        this.isPlaying = false;
        for (let track of this.tracks) {
            if (track.beatmap.source) {
                track.beatmap.source.stop(0);
            }
        }
        this.audioContext.suspend();
        clearTimeout(this.timeout);
        this.renderPlayButton();
        this.stopButton.unrender();
        this.currentIndex = 0;
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

    checkBpm(event) {
        if (event.target.valueAsNumber > 300) {
            this.domElement.querySelector("#bpm-input").value = 60;
        }
        return false;
    }

    render() {
        this.domElement.innerHTML = `
            <div class="play-buttons"></div>
            <label>BPM</label>
            <input type="number" min="10" max="300" id="bpm-input" value="${this.bpm}">
            <div class="grid"></div>
        `;
        this.renderPlayButton();

        this.domElement.querySelector("#bpm-input").addEventListener("change",
            (event) => {
                this.changeBpm(event.target.value); 
            });

        this.domElement.querySelector("#bpm-input").addEventListener("input",
        (event) => {
            this.checkBpm(event);
        });
        
    }
}

export default Engine;