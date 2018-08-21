import Component from "../Component";
import "./WaveForm.scss";

class WaveForm extends Component {
    constructor(container) {
        super(container, "waveform-container");
        document.addEventListener("trackselect", (event) => {
            this.track = event.detail.track;
            this.render();
        })
        document.addEventListener("rowselect", (event) => {
            this.track = event.detail.track;
            this.render();
        })
    }

    draw() {
        this.canvas = this.domElement.querySelector(".waveform");
        this.context = this.canvas.getContext("2d");
        let canvasWidth = this.canvas.width;
        let canvasHeight = this.canvas.height;
        let drawLines = 500;

        let leftChannel = this.track.buffer.getChannelData(0);
        
        this.context.save();
        this.context.fillStyle = 'transparent';
        this.context.fillRect(0, 0, canvasWidth, canvasHeight);
        this.context.strokeStyle = '#46a0ba';
        this.context.globalCompositeOperation = 'lighter';
        this.context.translate(0, canvasHeight / 2);

        this.context.lineWidth = 1;
        let totallength = leftChannel.length;
        let eachBlock = Math.floor(totallength / drawLines);

        let lineGap = Math.ceil((canvasWidth - drawLines) / (drawLines - 1) + 2);

        this.context.beginPath();

        for (let i = 0; i <= drawLines; i++) {
            let audioBuffKey = Math.floor(eachBlock * i);
            let x = i * lineGap;
            let y = leftChannel[audioBuffKey] * canvasHeight / 2;

            this.context.fillStyle = this.track.sound.type.colorType;
            this.context.fillRect(x, y, 1, -y);
            this.context.fillRect(x, -y, 1, y);
        }
        this.context.restore();
    }
    render() {
        this.domElement.innerHTML = `
            <div class="waveform-type">
                <div class="waveform-type-text">
                    ${this.track.sound.type.name.toUpperCase()}
                </div>
                <img class="waveform-type-image" src="${this.track.sound.type.iconSrc}">
            </div>
            <div class="waveform-name">
                ${this.track.sound.name.toUpperCase()}
            </div>
            <canvas class="waveform"></canvas>
        `;
        this.draw();
    }
}

export default WaveForm;