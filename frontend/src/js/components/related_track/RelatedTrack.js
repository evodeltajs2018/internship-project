import Component from "../Component";
import "./RelatedTrack.scss"
class RelatedTrack extends Component{
    constructor(container, sound, arrayBuffer, audioContext){
        super(container,"related-sample");
        this.sound = sound;
        this.audioContext = audioContext;
        this.decodeSound(arrayBuffer);
    }

    decodeSound(arrayBuffer) {
        return this.audioContext.decodeAudioData(arrayBuffer, (buff) => {
            this.buffer = buff;
            if (this.onBufferLoad) {
                this.onBufferLoad();
            }
        })
    }

    playSound() {
        this.audioContext.resume();
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.buffer;

        this.source.connect(this.audioContext.destination);
        this.source.start(0);

    }

    createSelectRelatedTrackEvent() {
        let event = new CustomEvent("relatedtrackselect", {
            bubbles: false,
            detail: { 
                index: this.index,
                track: this
            }
        });
        document.dispatchEvent(event);
    }


    render(){
        this.domElement.innerHTML = `
            <div>
                <img src="${this.sound.image}" alt="/img/tracks/default_audio.jpg" class="related-sample-image">
            </div>
            <div class="related-sample-description">
                <p class="related-sample-name">
                    ${this.sound.name}
                </p>
                <div class="related-sample-type">
                    ${this.sound.type.name}
                </div>
            </div>
        `;
    }
}

export default RelatedTrack;