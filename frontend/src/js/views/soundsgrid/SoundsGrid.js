import "./SoundsGrid.css";
import Component from "../../components/Component";
import SoundsGridRepository from "../../repositories/SoundsGridRepository";
import SoundRow from "../../components/soundrow/SoundRow";


class SoundsGrid extends Component {
    constructor(container) {
        super(container, "sounds-grid-container");

       // this.soundsRepository = new SoundsGridRepository();
        this.getData();
    }

    getData() {
        console.log("get data");
        SoundsGridRepository.getData((data) => {
            this.data = data;
            this.render();
		});
    }

    render() {
        this.domElement.innerHTML = `
            <div id="sounds-grid-header">
                <div class="sounds-cell">Name</div>
                <div class="sounds-cell">Type</div>
                <div class="actions-cell">Actions</div>
            </div>
            <div id="sounds-grid"></div>
            <div class="modals"></div>
        `;

        this.grid = this.domElement.querySelector("#sounds-grid");
        
        if (this.data) {
            for (let row of this.data) {
                this.htmlRow = new SoundRow(this.grid, row, () => {this.getData()});
                this.htmlRow.render();
            }
        }
    }

}

export default SoundsGrid;