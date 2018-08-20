import Component from "../../../components/Component";
import MatrixRow from "./matrixRow/MatrixRow";
import "./SplicerMatrix.scss";

class SplicerMatrix extends Component {
    constructor(container, tracks, mapSize) {
        super(container, "splicer-matrix");
        this.tracks = tracks;
        this.rows = null;
        this.mapSize = mapSize;
    }

    renderPages(start, rowLength) {
        let numbers = [];
        for (let i = start + 1; i <= start + rowLength; i++) {
            numbers.push(i);
        }
        this.domElement.querySelector(".row-count").innerHTML = `
            ${numbers.map(row => {
                return `<div class="cell ${row === 0? "current": ""}">${row}</div>`
            }).join("")}
        `;
    }

    renderRows(page, rowLength) {
        let start = page * rowLength;
        if (!this.rows) {
            this.rows = [];
            this.domElement.querySelector(".tracks").innerHTML = "";
            for (let i = 0; i < this.tracks.length; i++) {
                let row = new MatrixRow(
                    this.domElement.querySelector(".tracks"), 
                    this.tracks[i],
                    this.tracks[i].sound.type.colorType,
                    i,
                    rowLength,
                    start
                );
                this.rows.push(row);
                row.setup();
                row.render();
            }
            
        } else {
            for (let i = 0; i < this.tracks.length; i++) {
                this.rows[i].track = this.tracks[i],
                this.rows[i].color = this.tracks[i].sound.type.colorType,
                this.rows[i].index = i;
                this.rows[i].size = rowLength;
                this.rows[i].start = start;
                this.rows[i].setup();
                this.rows[i].render();
            }
        }
        this.renderPages(start, rowLength);
    }

    render() {
        this.domElement.innerHTML = `
            <div class="tracks"></div>
            <div class="row-count"></div>
        `;
   
        this.renderRows(this.trackSize);
    }
}

export default SplicerMatrix;