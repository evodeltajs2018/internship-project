import Component from "../../../../components/Component";
import "./MatrixRow.scss";

class MatrixRow extends Component {
    constructor(container, track, color, index) {
        super(container, "splicer-row");
        this.color = color;
        this.track = track;
        this.index = index;

        document.addEventListener("playbeat", (event) => {
            this.renderCurrentCell(event.detail.index);    
        });

        document.addEventListener("stop", () => {
            this.renderCurrentCell(-1);
        });

        document.addEventListener("clear", () => {
            this.clearBeatmap();
        });

        document.addEventListener("trackselect", (event) => {
            if (event.detail.index === this.index) {
                this.highlightRow();
            }
        });

    }

    createRowSelectEvent() {
        let event = new CustomEvent("rowselect", {
            bubbles: false,
            detail: {index: this.index}
        });
        document.dispatchEvent(event);
    }

    highlightRow() {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.classList.remove("selected");
        })
        this.domElement.querySelectorAll(".cell").forEach(cell => {
            cell.classList.add("selected");
        });
    }

    clearBeatmap() {
        this.domElement.querySelectorAll(".cell")
        .forEach(cell => {
            cell.classList.remove("active");
        });
        this.render();
    }

    renderCurrentCell(index) {
        this.domElement.querySelectorAll(".cell")
        .forEach(cell => {
            if (cell.classList.contains("current")) {
                cell.classList.remove("current");
            }
        });
        
        let cells = this.domElement.querySelectorAll(".cell");
        for (let i = 0; i < cells.length; i++) {
            if (i == index) {
                cells[i].classList.add("current");
                break;
            }
        }
        this.render();
    }

    setBeatActive(event, index) {
        this.track.toggleBeat(index);
        event.target.classList.toggle("active");
        this.render();
    }

    addTrackClickEvents() {
        let cells = this.domElement.querySelectorAll(".cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].onmouseover = (event) => {
                if (event.buttons == 1) {
                    this.setBeatActive(event, i);
                    
                }
                
            }
            cells[i].onclick = (event) => {
                this.setBeatActive(event, i);
                this.highlightRow();
                this.createRowSelectEvent();
            }
        }

    }

    setup() {
        let html = "<div class='row'>"
        for (let beat of this.track.beatmap) {
            html += `<div class='cell ${beat? "active" : ""}'></div>`;
        }
        html += "</div>";
        this.domElement.innerHTML = html;
        this.addTrackClickEvents();
    }

    render() {
        this.domElement.querySelectorAll(".cell").forEach(
            cell => {
                if (cell.classList.contains("current") &&  cell.classList.contains("active")) {
                    cell.style.background = "white";
                } else if (cell.classList.contains("active")) {
                    cell.style.background = this.color;
                } else {
                    cell.style.background = '';
                }
            }
        );
    }
}


export default MatrixRow;