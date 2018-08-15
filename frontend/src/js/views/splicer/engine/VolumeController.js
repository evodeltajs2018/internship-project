import Component from "../../../components/Component";

class VolumeController extends Component {
    constructor(container, beatmap, initVolume, color) {
        super(container, "volume-controller");
        this.beatmap = beatmap;
        this.volume = initVolume;
        this.color = color;
    }

    render() {
        this.domElement.innerHTML = `
            <input class="volume-input" 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value="${this.volume}">

        `;
        this.domElement.querySelectorAll(".volume-input")
        .forEach(elem => {
            elem.addEventListener("input", (event) => {
                this.volume = Number.parseFloat(event.target.value);
            });
            
        });
        this.domElement.querySelector(".volume-input").style.background = this.color;
    }

}

export default VolumeController;