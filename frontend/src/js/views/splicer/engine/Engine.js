import Component from "../../../components/Component";
import Button from "../../../components/button/Button";
import VolumeController from "./VolumeController";
import "./Engine.scss";


class Engine extends Component {
    constructor(container) {
        super(container, "splicer-engine");
        this.audioContext = new AudioContext();
        this.bpm = 200;
        this.mapSize = 32;
        this.currentIndex = 0;
        this.beatmap = [
            {
                name: "snare",
                url: "../src/js/views/splicer/engine/sounds/trap/Snare 003.wav",
                map: [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
                
            },
            {
                name: "hat",
                url: "../src/js/views/splicer/engine/sounds/trap/hihat.wav",
                map: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                
            },
            {
                name: "kick",
                url: "../src/js/views/splicer/engine/sounds/trap/Kick 002 Knock.wav",
                map: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                
            },
            {
                name: "what",
                url: "../src/js/views/splicer/engine/sounds/trap/Chant Who 001.wav",
                map: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                
            },
            {
                name: "bass",
                url: "../src/js/views/splicer/engine/sounds/trap/808 Bass A Deep.wav",
                map: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                
            },
        ];

        this.setupSounds();
    }

    setupSounds() {
        for (let sound of this.beatmap) {
            fetch(sound.url, {
                method: "GET"
            }).then(res => {
                return res.arrayBuffer();
            }).then(buffer => {
                this.audioContext.decodeAudioData(buffer, buff => {
                    sound.buffer = buff;
                });
            })
        }
    }

    changeBpm(bpm) {
        this.bpm = bpm;
    }

    getScheduleTime() {
        return (60000 / 4) / this.bpm;
    }

    playSound(beatmap, nextNoteTime) {
        let buffer = beatmap.buffer;
        beatmap.source = this.audioContext.createBufferSource();
        beatmap.source.buffer = buffer;
        
        let gainNode = this.audioContext.createGain();
        gainNode.gain.value = beatmap.volumeController.volume;
        beatmap.source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        beatmap.source.start(nextNoteTime);
    }

    playBeatmap() {
        let nextNoteTime = this.audioContext.currentTime;
        while (nextNoteTime < this.audioContext.currentTime + 0.1) {
            for (let sound of this.beatmap) {
                if (sound.map[this.currentIndex]) {
                    this.playSound(sound, nextNoteTime);
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
    }

    stop() {
        for (let sound of this.beatmap) {
            sound.source.stop(0);
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

    renderVolumeInputs() {
        for (let i = 0; i < this.beatmap.length; i++) {
            this.beatmap[i].volumeController = new VolumeController(
                this.domElement.querySelector(".grid"),
                this.beatmap[i],
                1
            );
            this.beatmap[i].volumeController.render();
        }
    }

    checkBpm(event) {
        console.log(event.target);
        if (event.target.valueAsNumber > 10 ) {
            
        }
    }

    render() {
        this.domElement.innerHTML = `
            <div class="play-buttons"></div>
            <label>BPM</label>
            <input type="number" min="10" max="300" id="bpm-input" value="${this.bpm}">
            <div class="grid"></div>
        `;
        this.renderVolumeInputs();
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