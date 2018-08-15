import Component from "../../../../components/Component";
import "./MatrixRow.scss";

class MatrixRow extends Component {
    constructor(container, track, color, index) {
        super(container, "splicer-row");
        this.color = color;
        this.track = track;
        this.index = index;

        document.addEventListener("play-beat", (event) => {
            this.renderCurrentCell(event.detail.index);    
        });

        document.addEventListener("stop", (event) => {
            this.renderCurrentCell(-1);
        });

        document.addEventListener("clear", (event) => {
            this.clearBeatmap();
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