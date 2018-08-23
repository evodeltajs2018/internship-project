import Component from "../../components/Component";
import Navigator from "../../services/router/Navigator";
import Button from "../button/Button";
import Modal from "../modal/Modal";
import "./Card.scss";
import Engine from "../../views/splicer/engine/Engine";
import SoundLoader from "../../services/sound_loader/SoundLoader";
import Track from "../track/Track";
import ProjectRepository from "../../repositories/ProjectRepository";

class Card extends Component {
    constructor(container, project, audioContext, playHandler) {
        super(container, "card");
        this.project = project;
        this.playHandler = playHandler;
        this.soundLoader = new SoundLoader();
        this.audioContext = audioContext;
        
    }

    deleteButtonHandler() {
        this.modal = new Modal(document.querySelector(".modals"), "Delete Project", "Are you sure you want to delete this project?");
        this.modal.render();
        this.modal.onConfirm = () => {
            this.onDelete(this.project.id);
        };
    }
 
	

    loadTracks() {
        this.soundLoader.getSoundsWithIds(this.project.beatmap.map(item => item.soundId))
        .then(() => {
            this.tracks = [];
            let sounds = this.soundLoader.sounds;
            let arrayBuffer = this.soundLoader.arrayBuffer;
            for (let i = 0; i < sounds.length; i++) {
                let track = new Track(
                    document.querySelector(".tracks-hidden"),
                    sounds[i],
                    arrayBuffer[i],
                    {
                        audioContext: this.audioContext,
                        mapSize: 32,
                        engine: this.engine,
                        beatmap: this.project.beatmap[i].map,
                        beatmapId: this.project.beatmap[i].id
                    }
                );
               
                
                this.tracks.push(track);
            }
            this.engine.tracks = this.tracks;
        })
    }

    openButtonHandler(idProjectParam) {
        Navigator.goToUrl("/splicer/" + idProjectParam);
    }

    editButtonHandler(idProjectParam) {
        Navigator.goToUrl("/project/" + idProjectParam);
    }

    renderWaveform() {
        this.soundCanvas = this.domElement.querySelector("canvas");
        this.soundCanvasContext = this.soundCanvas.getContext("2d");

        this.engine.analyser.fftSize = 128;
        let bufferLength = this.engine.analyser.frequencyBinCount;
        
        let data = new Uint8Array(bufferLength);
        this.updateWaveform(data, bufferLength);
    }

    updateWaveform(data, bufferLength) {
        this.engine.analyser.getByteFrequencyData(data);
        this.drawSoundGraph(data, bufferLength);
        requestAnimationFrame(() => this.updateWaveform(data, bufferLength));
    }
    
    map (num, in_min, in_max, out_min, out_max) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    drawSoundGraph(data, bufferLength) {
        this.soundCanvasContext.clearRect(0,0,this.soundCanvas.width, this.soundCanvas.height);
        let barWidth = (this.soundCanvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        for(let i = 0; i < data.length; i++) {
            barHeight = this.map(data[i], 0, 255, 0, this.soundCanvas.height);
            this.soundCanvasContext.fillStyle = "rgba(70, 162, 158, 0.8)";
            this.soundCanvasContext.fillRect(x,this.soundCanvas.height-barHeight,barWidth,barHeight);
    
            x += barWidth + 1;
          }
        
    }

    render() {
        this.domElement.innerHTML = `
        <div class="card-header content"><i class="fa fa-times-circle delete-icon"></i> <div>${this.project.name}<br>${this.project.genre.name}</div></div>

        <div class="card-body content">
            <p class="card-text">${this.project.description}</p>
            <div class="card-engine"></div>
            <div class="tracks-hidden"></div>
            <canvas />
        </div>

        <div class="card-footer content">
        </div>
        `;
        this.engine = new Engine(this.domElement.querySelector(".card-engine"), 
            this.audioContext, 
            32, 
            () => {}, 
            this.project.bpm, {
            play: true
        });
        this.engine.cardPlayHandler = () => {
            if (!this.project.beatmap) {
                
                ProjectRepository.getBeatmap(this.project.id).then((beatmap) => {
                    this.project.beatmap = beatmap;
                    
                    this.loadTracks();
                });
            }
            this.playHandler(this.project.id);
        }
        this.engine.render();
        this.renderWaveform();
        let idProject = this.project.id;

        this.domElement.querySelector(".delete-icon").addEventListener("click", () => {
            this.deleteButtonHandler();
            document.querySelector("body").style.overflow = "hidden";
        });

        this.openButton = new Button(this.domElement.querySelector(".card-footer"), "OPEN", "card-button", () => {
            this.openButtonHandler(idProject);
        });
        this.openButton.render();

        this.editButton = new Button(this.domElement.querySelector(".card-footer"), "EDIT", "card-button", () => {
            this.editButtonHandler(idProject)
        });
        this.editButton.render();
    }

}

export default Card;