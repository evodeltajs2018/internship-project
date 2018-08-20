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

const sizes = [
    {
        window: window.innerWidth + 1,
        trackSizeHigh: 32,
        trackSizeLow: 32,
        pagesHigh: 0,
        pagesLow: 0
    },
    {
        window: 1310,
        trackSizeHigh: 32,
        trackSizeLow: 16,
        pagesHigh: 2,
        pagesLow: 0
    },
    {
        window: 700,
        trackSizeHigh: 16,
        trackSizeLow: 8,
        pagesHigh: 4,
        pagesLow: 2
    },
];

class Splicer extends Component {
    constructor(container, projectId) {
        super(container, "splicer");

        this.audioContext = new AudioContext();

        this.projectId = projectId;
        this.mapSize = 32;
        this.currentTrackSize = this.mapSize;
        this.currentPage = 0;
        this.setup();
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
            this.mapSize
        );
        this.engine.render();
        window.addEventListener("resize", () => {
            this.renderByWidth();
        })
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
                    engine: this.engine
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

    addSoundLoaderEvent() {
        this.soundLoader.onLoad = () => {
            if (this.soundLoader.sounds) {
                    this.renderTracks();
                }
            }
        }

    render() {
        this.domElement.querySelector(".splicer-main").innerHTML = `
            <div class="tracks-bar"></div>
            <div class="matrix"></div>
            <div class="waveform-container"></div>
            
        `;
        this.soundLoader = new SoundLoader();
        this.relatedSoundLoader = new RelatedSoundLoader();
        
        this.addSoundLoaderEvent();

        this.waveForm = new WaveForm(document.querySelector(".splicer-sample-header"));

    }
}


export default Splicer;