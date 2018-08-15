import Component from "../Component";
import "./WaveForm.scss";

class WaveForm extends Component {
    constructor(container, track) {
        super(container, "waveform-container");
        this.arrayBuffer = track;
    }

    draw(){
        this.audioCtx = new window.AudioContext();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 2048;
        this.bufferLength = this.analyser.frequencyBinCount;

        const uint8 = new Uint8Array(this.bufferLength);
        this.canvas = document.querySelector(".waveform");
        this.canvasCtx = this.canvas.getContext('2d');
        this.canvasCtx.clearRect(0, 0, 500, 200);

        this.analyser.getByteTimeDomainData(uint8);

        this.canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        this.canvasCtx.fillRect(0, 0, 500, 200);

        this.canvasCtx.lineWidth = 2;
        this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        this.canvasCtx.beginPath();

        var sliceWidth = 500 * 1.0 / this.bufferLength;
        var x = 0;

        for(let i=0;i<uint8.length;i++){
            uint8[i]=Math.ceil(Math.random()*100);
        }
        
        for (var i = 0; i < this.bufferLength; i++) {
            var v = uint8[i] / 128.0;
            var y = v * 100 / 2;


            if (i === 0) {
                this.canvasCtx.moveTo(x, y);
            } else {
                this.canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.canvasCtx.stroke();
    }


    render() {
        this.domElement.innerHTML = `<canvas class="waveform"></canvas>`;
        this.draw();
    }
}

export default WaveForm;