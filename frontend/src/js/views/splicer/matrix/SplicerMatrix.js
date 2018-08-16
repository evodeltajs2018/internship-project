import Component from "../../../components/Component";
import MatrixRow from "./matrixRow/MatrixRow";

class SplicerMatrix extends Component {
    constructor(container, tracks) {
        super(container, "splicer-matrix");
        this.tracks = tracks;
        this.rows = [];
        
    }

    createRows() {
        let rows = [];
        for (let i = 0; i < this.tracks.length; i++) {
            let row = new MatrixRow(
                this.domElement.querySelector(".tracks"), 
                this.tracks[i],
                this.tracks[i].sound.type.colorType,
                i
            );
            rows.push(row);
            row.setup();

        }
        return rows;
    }

    render() {
        this.domElement.innerHTML = `
            <div class="tracks"></div>
        `;
   
        this.createRows(this.tracks);
       
    }
}

export default SplicerMatrix;