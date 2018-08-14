import Component from "../../../components/Component";

class VolumeController extends Component {
    constructor(container, beatmap, initVolume) {
        super(container, "volume-controller");
        this.beatmap = beatmap;
        this.volume = initVolume;
    }

    render() {
        this.domElement.innerHTML = `
            <input class="volume-input" 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value="${this.volume}">
            ${this.beatmap.name}
        `;
        this.domElement.querySelectorAll(".volume-input")
        .forEach(elem => {
            elem.addEventListener("input", (event) => {
                this.volume = Number.parseFloat(event.target.value);
            });
        });
    }

}

export default VolumeController;