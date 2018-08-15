import Component from "../../../../components/Component";
import "./MatrixRow.scss";

class MatrixRow extends Component {
    constructor(container, track) {
        super(container, "splicer-row");
        this.track = track;

    }

    render() {
        console.log(this.track.beatmap);
        let html = "<div class='row'>"
        for (let beat of this.track.beatmap) {
            html += "<div class='cell'>" + beat + "</div>";
        }
        html += "</div>";
        console.log(html);
        this.domElement.innerHTML = html;
    }
}


export default MatrixRow;