import Component from "../Component";
import Button from "../button/Button";
import "./Pagination.scss";

class Pagination extends Component {
    constructor(container, changePageFunction, type = "") {
        super(container, "sounds-pagination");
        this.changePageFunction = changePageFunction;
        this.type = type

        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.pageCount = null;
        this.itemsThisPage = 0;
        this.itemCount = 0;
    }

    setup() {
        this.addPrevButtons();
        this.addPageButtons();
        this.addNextButtons();
        this.disableUnusableButtons();
        this.setupPageInfo();
    }

    setupPageInfo() {
        if (this.currentPage === 0) {
            this.currentPage = 1;
        }
        let startItemIndex = this.itemsPerPage * (this.currentPage - 1);
        let endItemIndex = startItemIndex + this.itemsThisPage;
        if (this.pageCount) {
            startItemIndex++;
        }
        
        this.domElement.querySelector(".page-info").innerHTML = `
            Showing <span>${startItemIndex}</span>
            - 
            <span>${ endItemIndex }</span> out of <span>${this.itemCount}</span> ${this.type}
        `;
    }

    addPrevButtons() {
        let prevButton = new Button(this.domElement.querySelector(".pages"),
            `<i class="fas fa-long-arrow-alt-left"></i>Previous page`,
            "arrow-button prev-button",
            () => {
                this.changePageFunction(this.currentPage - 1);
            });
        prevButton.render();

        let button = new Button(this.domElement.querySelector(".pages"), "<<",
            "pagination-button prev-button",
            () => {
                this.changePageFunction(1);
            });
        button.render();
    }

    addNextButtons() {
        let button = new Button(this.domElement.querySelector(".pages"), ">>",
            "pagination-button next-button",
            () => {
                this.changePageFunction(this.pageCount);
            });
        button.render();

        let nextButton = new Button(this.domElement.querySelector(".pages"),
            `Next page<i class="fas fa-long-arrow-alt-right"></i>`,
            "arrow-button next-button",
            () => {
                this.changePageFunction(this.currentPage + 1);
            });
        nextButton.render();
    }

    addPageButtons() {
        for (let i = 1; i <= this.pageCount; i++) {
            let buttonClass = "pagination-button";
            if (i == this.currentPage) {
                buttonClass += " current-page";
            }
            let button = new Button(this.domElement.querySelector(".pages"), i,
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

    render() {
        this.domElement.innerHTML = `
            <div class="page-info"></div>
            <div class="pages"></div>
        `;
    }
}

export default Pagination;