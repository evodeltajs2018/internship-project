import Component from "../../../components/Component";
import MatrixRow from "./matrixRow/MatrixRow";

class SplicerMatrix extends Component {
    constructor(container, tracks) {
        super(container, "splicer-matrix");
        this.tracks = tracks;
        this.rows = [];
        
    }

    createRows(tracks) {
        let rows = [];
        for (let track of tracks) {
            let row = new MatrixRow(this.domElement.querySelector(".tracks"), track);
            rows.push(row);
            row.render();

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