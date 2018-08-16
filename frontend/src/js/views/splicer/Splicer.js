import Component from "../../components/Component";
import Track from "../../components/track/Track";
import WaveForm from "../../components/waveform/WaveForm";
import Engine from "./engine/Engine";
import SoundLoader from "./sound_loader/SoundLoader";
import SplicerMatrix from "./matrix/SplicerMatrix";
import "./Splicer.scss";
import Button from "../../components/button/Button";

const sizes = [
    {
        window: 5000,
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
        this.currentTrackSize = 32;
        this.currentPage = 0;
        this.setup();
    }

    setup() {
        this.domElement.innerHTML = `
            <div class="splice-header"></div>
            <div class="splicer-main"></div>
            <div class="track-pages"></div>
        `;
        this.engine = new Engine(this.domElement.querySelector(".splice-header"), this.audioContext, this.mapSize);
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
                console.log(size);
                this.currentPage = 0;
                this.matrix.renderRows(this.currentPage, size.trackSizeHigh);
                this.currentTrackSize = size.trackSizeHigh;
                this.renderTrackPages(size.pagesLow);
            }
        }
    }

    renderTrackPages(pages) {
        console.log(pages);
        let pageContainer =  this.domElement.querySelector(".track-pages");
        pageContainer.innerHTML = "";
        if (pages > 0) {
            for (let i = 0; i < pages; i++) {
                let button = new Button(pageContainer, "", "track-page-btn",
                () => {
                    this.currentPage = i;
                    this.matrix.renderRows(this.currentPage, this.currentTrackSize);
                } );
                button.render();
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

    renderTracks() {
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

            track.render();
            this.tracks.push(track);
        }
        this.engine.tracks = this.tracks;
        this.matrix = new SplicerMatrix(document.querySelector(".matrix"), this.tracks, this.mapSize);
        this.matrix.render();

        this.renderByWidth();
    }

    addSoundLoaderEvent() {
        this.soundLoader.onLoad = () => {
            if (this.soundLoader.sounds) {
                this.renderTracks();
                this.waveForm = new WaveForm(this.domElement);
            }
        }
    }

    render() {
        this.domElement.querySelector(".splicer-main").innerHTML = `
            <div class="tracks-bar"></div>
            <div class="matrix"></div>
            <div class="waveform-container"></div>
            
        `;

        this.soundLoader = new SoundLoader(document.querySelector(".tracks-pattern"));

        this.addSoundLoaderEvent();

    }
}

export default Splicer;