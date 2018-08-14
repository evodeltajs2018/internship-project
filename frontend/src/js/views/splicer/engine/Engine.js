import Component from "../../../components/Component";
import Button from "../../../components/button/Button";
import "./Engine.scss";


class Engine extends Component {
    constructor(container) {
        super(container, "splicer-engine");
        this.audioContext = new AudioContext();
        this.bpm = 120;
        this.mapSize = 32;
        this.currentIndex = 0;
        this.volume = 1;
        this.beatmap = [
            {
                name: "wow.mp4",
                url: "../src/js/views/splicer/engine/sounds/wow.mp4",
                map: [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                volume: 1
            },
            {
                name: "snare",
                url: "../src/js/views/splicer/engine/sounds/snare.wav",
                map: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
                volume: 1
            },
            {
                name: "hihat",
                url: "../src/js/views/splicer/engine/sounds/hihat.wav",
                map: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                volume: 1
            }
        ];
        
        this.setupSounds();
    }

    setupSounds() {
        for (let sound of this.beatmap) {
            fetch(sound.url, {
                method: "GET"
            }).then(res => {
                //console.log(res);
                return res.arrayBuffer();
            }).then(buffer => {
                //console.log(buffer);
                this.audioContext.decodeAudioData(buffer, buff => {
                    sound.buffer = buff;
                });
            })
        }


    }

    changeBpm(bpm) {
        console.log("changing btm to " + bpm);
        this.bpm = bpm;
    }

    playSound(sound, nextNoteTime) {
        console.log(sound);
        let buffer = sound.buffer;
        let source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        let gainNode = this.audioContext.createGain();
        gainNode.gain.value = sound.volume;

        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        //source.connect(this.audioContext.destination);
        source.start(nextNoteTime);
    }

    stop() {
        clearTimeout(this.timeout);
        this.renderPlayButton();
        this.stopButton.unrender();
    }

    getScheduleTime() {
        return 30000 / this.bpm;
    }

    play() {
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
        this.timeout = setTimeout(() => this.play(), this.getScheduleTime());

    }

    renderPlayButton() {
        this.playButton = new Button(this.domElement.querySelector(".play-buttons"), `<i class="fas fa-play"></i>`, "play-button")
        this.playButton.render();
        this.domElement.querySelector(".play-button").addEventListener("click", 
            () => { 
                this.play(); 
                this.playButton.unrender(); 
                this.renderStopButton();
            });   
    }

    renderStopButton() {
        this.stopButton = new Button(this.domElement.querySelector(".play-buttons"), `<i class="fas fa-stop"></i>`, "stop-button")
        this.stopButton.render();
        this.domElement.querySelector(".stop-button").addEventListener("click", () => this.stop());
    }

    render() {
        this.domElement.innerHTML = `
            <div class="play-buttons"></div>
            
            <label>BPM</label>
            <input min="10" max="300" id="bpm-input" value="${this.bpm}" type="number">
            <label>Volume</label>
            <div class="grid"></div>
        `;
        for (let i = 0; i < this.beatmap.length; i++) {
            this.domElement.querySelector(".grid").innerHTML += `
                <div>
                    ${this.beatmap[i].name}
                    <input class="volume-input" type="range" min="0" max="1" step="0.01" value="1" soundIndex="${i}">
                </div>
            
            `;
        }
        this.renderPlayButton();
        this.domElement.querySelector("#bpm-input").addEventListener("change", 
            (event) => this.changeBpm(event.target.value));
        this.domElement.querySelectorAll(".volume-input").forEach(elem => {
            elem.addEventListener("input", (event) => {
                //this.volume = Number.parseFloat(event.target.value); console.log(this.volume);
                this.beatmap[event.target.getAttribute("soundIndex")].volume = Number.parseFloat(event.target.value);
                //console.log(this.beatmap);
            });
        });
    }
}

export default Engine;