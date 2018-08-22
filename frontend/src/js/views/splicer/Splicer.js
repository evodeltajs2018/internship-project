import Component from "../../components/Component";
import Track from "../../components/track/Track";
import WaveForm from "../../components/waveform/WaveForm";
import Engine from "./engine/Engine";
import SoundLoader from "../../services/sound_loader/SoundLoader";
import RelatedSoundLoader from "../../services/sound_loader/RelatedSoundLoader";
import SplicerMatrix from "./matrix/SplicerMatrix";
import "./Splicer.scss";
import Button from "../../components/button/Button";
import RelatedTrack from "../../components/related_track/RelatedTrack";
import ProjectRepository from "../../repositories/ProjectRepository";

const sizes = [
    {
        window: window.innerWidth + 1,
        trackSizeHigh: 32,
        trackSizeLow: 32,
        pagesHigh: 0,
        pagesLow: 0
    },
    {
        window: 1610,
        trackSizeHigh: 32,
        trackSizeLow: 16,
        pagesHigh: 2,
        pagesLow: 0
    },
    {
        window: 1000,
        trackSizeHigh: 16,
        trackSizeLow: 8,
        pagesHigh: 4,
        pagesLow: 2
    },
];

class Splicer extends Component {
    constructor(container, projectId) {
        super(container, "splicer");
        
        this.saveProjectHandler = () => {this.saveProject()};
        this.audioContext = new AudioContext();
        this.project = {
            id: projectId,
            bpm: 0
        }
        this.mapSize = 32;
        this.currentTrackSize = this.mapSize;
        this.currentPage = 0;

        this.getBpm().then(() => {
            this.engine.bpm = this.project.bpm;
            this.engine.render();
        });
        
        this.getBeatmap();
        this.setup();
        this.initHandlers();
        this.addEventHandlers();
       
    }

    getBpm() {
        return ProjectRepository.getProjectById(this.project.id)
        .then(result => {
            this.project.bpm = result[0].bpm;
        })
    }

    addEventHandlers() {
        window.addEventListener("popstate", this.onPageLeave);
        document.addEventListener("rowselect", this.rowSelectHandler);
    }

    initHandlers() {
        this.onPageLeave = () => {
            window.removeEventListener("popstate", this.onPageLeave);
            document.removeEventListener("rowselect", this.rowSelectHandler);
        }
        this.rowSelectHandler = (event) => {
            document.querySelector(".splicer-sample-tracks").innerHTML = "";
            this.relatedTracksLoader(event.detail.track);
        }
    }

    addEmptyMap() {
        let promises = [];
        for (let i = 0; i < this.soundLoader.sounds.length; i++) {
            promises.push(ProjectRepository.addBeatmap({
                projectId: this.project.id,
                soundId: this.soundLoader.sounds[i].id,
                map: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            }));
        }
        Promise.all(promises).then(() => {
            this.getBeatmap();
        });
    }

    getBeatmap() {
        ProjectRepository.getBeatmap(this.project.id)
        .then(result => {       
            this.beatmaps = result;
            return result;
        })
        .then(beatmap => {
            return this.soundLoader.getSoundsWithIds(beatmap.map(item => {return item.soundId;}))
            .then(() => {
                if (!this.soundLoader.arrayBuffer.length || !this.soundLoader.sounds.length) {
                    return this.soundLoader.getSounds();
                }
            })
            
            
        }).then(() => {
            if (!this.beatmaps.length) {
                this.addEmptyMap();
            } else {

                this.renderTracks();
            }
        });
    }

    setup() {
        this.domElement.innerHTML = `
            <div class="splice-header"></div>
            <div class="splicer-main"></div>
            <div class="track-pages"></div>
            <div class="splicer-sample-selector"><div class="splicer-sample-header"></div><div class="splicer-sample-tracks"></div></div>
        `;
        this.engine = new Engine(
            this.domElement.querySelector(".splice-header"),
            this.audioContext,
            this.mapSize,
            this.saveProjectHandler,
            this.project.bpm
        );
        this.engine.render();
        window.addEventListener("resize", () => {
            this.renderByWidth();
        })
    }

    saveProject() {
        let promises = [];
        let i = 0;
        for (let track of this.engine.tracks) {
            promises.push(ProjectRepository.editBeatmap(
                this.beatmaps[i].id, 
                {
                    soundId: track.sound.id,
                    projectId: this.project.id,
                    map: track.beatmap,
                    bpm: this.engine.bpm
                }
            ));
            i++;
        }
        Promise.all(promises);
        
    }

    renderByWidth() {
        for (let size of sizes) {
            if (window.innerWidth < size.window && this.currentTrackSize === size.trackSizeHigh) {
                this.matrix.renderRows(this.currentPage, size.trackSizeLow);
                this.currentTrackSize = size.trackSizeLow;
                this.renderTrackPages(size.pagesHigh);
            } else if (window.innerWidth > size.window && this.currentTrackSize === size.trackSizeLow) {
                this.currentPage = 0;
                this.matrix.renderRows(this.currentPage, size.trackSizeHigh);
                this.currentTrackSize = size.trackSizeHigh;
                this.renderTrackPages(size.pagesLow);
            }
        }
    }

    renderTrackPages(pages) {
        let pageContainer = this.domElement.querySelector(".track-pages");
        pageContainer.innerHTML = "";
        if (pages > 0) {
            for (let i = 0; i < pages; i++) {
                let button = new Button(pageContainer, "", "track-page-btn",
                    () => {
                        this.currentPage = i;
                        this.matrix.renderRows(this.currentPage, this.currentTrackSize);
                    });
                button.render();
            }
        }
    }

    relatedTracksLoader(track) {
        document.querySelector(".splicer-sample-tracks").innerHTML = "";
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

    changeMapSize(newSize) {
        this.mapSize = newSize;
        for (let track of this.tracks) {
            track.mapSize = newSize;
        }
        this.matrix.mapSize = newSize;
        this.engine.mapSize = newSize;
    }

    loadTracks() {
        this.tracks = [];
        for (let i = 0; i < this.soundLoader.sounds.length; i++) {
            let track = new Track(
                document.querySelector(".tracks-bar"),
                this.soundLoader.sounds[i],
                this.soundLoader.arrayBuffer[i],
                {
                    audioContext: this.audioContext,
                    mapSize: this.mapSize,
                    index: i,
                    engine: this.engine,
                    beatmap: this.beatmaps[i]? this.beatmaps[i].map : null,
                    beatmapId: this.beatmaps[i]? this.beatmaps[i].id : null
                }
            );
            track.domElement.addEventListener("click", () => {
                document.querySelector(".splicer-sample-tracks").innerHTML = "";
                this.relatedTracksLoader(track);
            })
            track.render();
            this.tracks.push(track);
        }
    }

    renderTracks() {
        this.loadTracks();
        this.engine.tracks = this.tracks;
        this.matrix = new SplicerMatrix(
            document.querySelector(".matrix"),
            this.tracks,
            this.mapSize
        );
        this.matrix.render();
        this.renderByWidth();
    }

    render() {
        this.domElement.querySelector(".splicer-main").innerHTML = `
            <div class="tracks-bar"></div>
            <div class="matrix"></div>
            <div class="waveform-container"></div>
            
        `;
        this.soundLoader = new SoundLoader();
        this.relatedSoundLoader = new RelatedSoundLoader();
        this.waveForm = new WaveForm(document.querySelector(".splicer-sample-header"));

    }
}


export default Splicer;