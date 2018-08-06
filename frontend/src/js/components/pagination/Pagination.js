import Component from "../Component";
import Button from "../button/Button";
import "./Pagination.scss";

class Pagination extends Component {
    constructor(container, changePageFunction) {
        super(container, "sounds-pagination");
        this.changePageFunction = changePageFunction;

        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.pageCount = null;
    }

    setup() {
        this.addPrevButton();
        this.addPageButtons();
        this.addNextButton();
        this.addArrowButtons();
    }

    addPrevButton() {
        let button = new Button(this.domElement.querySelector("#pages"), "<<",
            "pagination-button prev-button",
            () => {
                this.changePageFunction(1);
            });
        button.render();
    }

    addNextButton() {
        let button = new Button(this.domElement.querySelector("#pages"), ">>",
            "pagination-button next-button",
            () => {
                this.changePageFunction(this.pageCount);
            });
        button.render();
    }

    addPageButtons() {
        for (let i = 1; i <= this.pageCount; i++) {
            let buttonClass = "pagination-button";
            if (i == this.currentPage) {
                buttonClass += " current-page";
            }
            let button = new Button(this.domElement.querySelector("#pages"), i,
                buttonClass,
                () => {
                    this.changePageFunction(button.text);
                });
            button.render();
        }
    }

    disablePreviousButtons() {
        document.querySelectorAll(".prev-button").forEach((btn) => { btn.disabled = true; });
    }

    disableNextButtons() {
        document.querySelectorAll(".next-button").forEach((btn) => { btn.disabled = true; });
    }

    disableUnusableButtons() {
        this.domElement.querySelectorAll(".arrow-button").forEach((btn) => { btn.disabled = false; });

        if (this.pageCount <= 1) {
            this.disableNextButtons();
            this.disablePreviousButtons();
        } else {
            if (this.currentPage === 1) {
                this.disablePreviousButtons();
            } else if (this.currentPage === this.pageCount) {
                this.disableNextButtons();
            }
        }
    }

    addArrowButtons() {
        let arrowButtonsContainer = document.createElement("div");
        arrowButtonsContainer.className = "arrow-buttons-container";
        this.domElement.appendChild(arrowButtonsContainer);

        let prevButton = new Button(arrowButtonsContainer,
            `<i class="fas fa-long-arrow-alt-left"></i>Older`,
            "arrow-button prev-button",
            () => {
                this.changePageFunction(this.currentPage - 1);
            });
        prevButton.render();

        let nextButton = new Button(arrowButtonsContainer,
            `Newer<i class="fas fa-long-arrow-alt-right"></i>`,
            "arrow-button next-button",
            () => {
                this.changePageFunction(this.currentPage + 1);
            });
        nextButton.render();
    }

    
    render() {
        this.domElement.innerHTML = `
            <div id="pages"></div>
        `;
    }
}

export default Pagination;