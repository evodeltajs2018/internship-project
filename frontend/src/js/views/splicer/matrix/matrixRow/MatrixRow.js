import Component from "../../../../components/Component";
import "./MatrixRow.scss";

class MatrixRow extends Component {
    constructor(container, track, color, index, size, start) {
        super(container, "splicer-row");
        this.size = size;
        this.color = color;
        this.track = track;
        this.index = index;
        this.start = start;

        this.initHandlers();
        this.addMatrixListeners();
        
    }

    initHandlers() {
        this.playBeatHandler = (event) => {
            this.renderCurrentCell(event.detail.index);    
        }

        this.stopHandler = () => {
            this.renderCurrentCell(-1);
        }

        this.clearHandler = () => {
            this.clearBeatmap();
        }

        this.trackselectHandler = (event) => {
            if (event.detail.index === this.index) {
                this.highlightRow();
            }
        }
    }

    addMatrixListeners() {
        document.addEventListener("playbeat", this.playBeatHandler);
        document.addEventListener("stop", this.stopHandler);
        document.addEventListener("clear", this.clearHandler);
        document.addEventListener("trackselect", this.trackselectHandler);

        window.addEventListener("popstate", () => {
            this.handlePageLeave();
        });
    }

    handlePageLeave() {
        document.removeEventListener("playbeat", this.playBeatHandler);
        document.removeEventListener("stop", this.stopHandler);
        document.removeEventListener("clear", this.clearHandler);
        document.removeEventListener("trackselect", this.trackselectHandler);

        window.removeEventListener("popstate", this.handlePageLeave);
    }

    createRowSelectEvent() {
        let event = new CustomEvent("rowselect", {
            bubbles: false,
            detail: {
                index: this.index,
                track: this.track
            }
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
        // console.log(1);
        let cells = this.domElement.querySelectorAll(".cell");

        cells.forEach(cell => {
            if (cell.classList.contains("current")) {
                cell.classList.remove("current");
            }
        });
        
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
            cells[i].onmousedown = (event) => {
                this.setBeatActive(event, i);
                this.highlightRow();
                this.createRowSelectEvent();
            }
        }
    }

    setup() {
        let html = "<div class='row'>";
        for (let i = 0; i < this.start + this.size; i++) {
            let hiddenClass = ""; 
            if (i < this.start || i > this.start + this.size) {
                hiddenClass = "hidden";
            }
            html += `<div class='cell ${this.track.beatmap[i]? "active" : ""} ${hiddenClass}'></div>`;
        }
        html += "</div>";
        this.domElement.innerHTML = html;
        this.addTrackClickEvents();
    }

    render() {
        this.domElement.querySelectorAll(".cell").forEach(
            cell => {
                let currentAndActive = 
                    cell.classList.contains("current") 
                    &&  
                    cell.classList.contains("active");

                if (currentAndActive) {
                    cell.style.background = "white";
                } else if (cell.classList.contains("active")) {
                    cell.style.background = this.color;
                } else {
                    cell.style.background = "";
                }
            }
        );
    }
}


export default MatrixRow;