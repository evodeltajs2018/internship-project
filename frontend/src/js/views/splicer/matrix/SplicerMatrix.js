import Component from "../../../components/Component";
import MatrixRow from "./matrixRow/MatrixRow";
import "./SplicerMatrix.scss";

class SplicerMatrix extends Component {
    constructor(container, tracks, mapSize) {
        super(container, "splicer-matrix");
        this.tracks = tracks;
        this.rows = [];
        this.mapSize = mapSize;
    }

    renderRowCount(start, rowLength) {
        let numbers = [];
        for (let i = start + 1; i <= start + rowLength; i++) {
            numbers.push(i);
        }
        this.domElement.querySelector(".row-count").innerHTML = `
            ${numbers.map(row => {
                return `<div class="cell">${row}</div>`
            }).join("")}
        `;
    }

    renderRows(page, rowLength) {
        let start = page * rowLength;
        let rows = [];
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
            rows.push(row);
            row.setup();
            row.render();
        }
        this.renderRowCount(start, rowLength);
        return rows;
    }

    render() {
        this.domElement.innerHTML = `
            <div class="tracks"></div>
            <div class="row-count"></div>
        `;
   
        this.renderRows(32);
       
    }
}

export default SplicerMatrix;