import Component from "../Component";
import "./WaveForm.scss";

class WaveForm extends Component {
    constructor(container, track) {
        super(container, "waveform-container");
        this.track = track;
        this.audioContext = new AudioContext();
        this.currentBuffer = null;
    }

    draw() {
        this.canvas = document.querySelector(".waveform");
        this.context = this.canvas.getContext("2d");
        let canvasWidth = this.canvas.width;
        console.log(canvasWidth);
        let canvasHeight = 100;
        let drawLines = 500;
        
        let leftChannel = this.track.buffer.getChannelData(0);
        console.log(leftChannel);
        
        let lineOpacity = window.innerWidth / leftChannel.length;
        this.context.save();
        this.context.fillStyle = 'transparent';
        this.context.fillRect(0, 0, canvasWidth, canvasHeight);
        this.context.strokeStyle = '#46a0ba';
        this.context.globalCompositeOperation = 'lighter';
        this.context.translate(0, canvasHeight / 2);
        
        this.context.lineWidth = 1;
        let totallength = leftChannel.length;
        let eachBlock = Math.floor(totallength / drawLines);

        let lineGap = Math.ceil((canvasWidth - drawLines)/(drawLines-1) + 1);

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
        this.domElement.innerHTML = `<canvas class="waveform" width="200" height="300"></canvas>`;
        this.draw();
    }
}

export default WaveForm;