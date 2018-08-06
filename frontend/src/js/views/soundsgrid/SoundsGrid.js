import "./SoundsGrid.scss";
import Component from "../../components/Component";
import SoundsGridRepository from "../../repositories/SoundsGridRepository";
import SoundRow from "../../components/soundrow/SoundRow";
import Button from "../../components/button/Button";

class SoundsGrid extends Component {
    constructor(container) {
        super(container, "sounds-grid-container");

        this.pagination = {
            currentPage: 1,
            itemsPerPage: 3,
            pageCount: null
        }
        this.getData();
    }

    getData() {
        SoundsGridRepository.getData(this.pagination, (data) => {
            this.data = data.data;
            this.pagination.pageCount = data.pageCount;
            this.render();
            this.setupPagination(data.pageCount);
            this.disableUnusableButtons();
            if (this.pagination.pageCount < this.pagination.currentPage) {
                this.goToPage(this.pagination.pageCount);
            }
        });
    }

    addPrevButton() {
        let button = new Button(this.soundsPagination.querySelector("#pages"), "<<",
            "pagination-button prev-button",
            () => {
                this.goToPage(1);
            });
        button.render();
    }

    addNextButton() {
        let button = new Button(this.soundsPagination.querySelector("#pages"), ">>",
            "pagination-button next-button",
            () => {
                this.goToPage(this.pagination.pageCount);
            });
        button.render();
    }

    addPageButtons() {
        for (let i = 1; i <= this.pagination.pageCount; i++) {
            let buttonClass = "pagination-button";
            if (i == this.pagination.currentPage) {
                buttonClass += " current-page";
            }
            let button = new Button(this.soundsPagination.querySelector("#pages"), i,
                buttonClass,
                () => {
                    this.goToPage(button.text);
                });
            button.render();

        }
    }

    addArrowButtons() {
        let arrowButtonsContainer = document.createElement("div");
        arrowButtonsContainer.className = "arrow-buttons-container";
        this.soundsPagination.appendChild(arrowButtonsContainer);

        let prevButton = new Button(arrowButtonsContainer,
            `<i class="fas fa-long-arrow-alt-left"></i>Older`,
            "arrow-button prev-button",
            () => {
                this.goToPage(this.pagination.currentPage - 1);
            });
        prevButton.render();

        let nextButton = new Button(arrowButtonsContainer,
            `Newer<i class="fas fa-long-arrow-alt-right"></i>`,
            "arrow-button next-button",
            () => {
                this.goToPage(this.pagination.currentPage + 1);
            });
        nextButton.render();
    }

    setupPagination() {
        this.soundsPagination = this.domElement.querySelector("#sounds-pagination");
        this.addPrevButton();
        this.addPageButtons();
        this.addNextButton();
        this.addArrowButtons();

    }

    goToPage(page) {
        this.pagination.currentPage = page;
        this.getData();

    }

    disablePreviousButtons() {
        document.querySelectorAll(".prev-button").forEach((btn) => { btn.disabled = true; });
    }

    disableNextButtons() {
        document.querySelectorAll(".next-button").forEach((btn) => { btn.disabled = true; });
    }

    disableUnusableButtons() {
        this.domElement.querySelectorAll(".arrow-button").forEach((btn) => { btn.disabled = false; });

        if (this.pagination.pageCount <= 1) {
            this.disableNextButtons();
            this.disablePreviousButtons();
        } else {
            if (this.pagination.currentPage === 1) {
                this.disablePreviousButtons();
            } else if (this.pagination.currentPage === this.pagination.pageCount) {
                this.disableNextButtons();
            }
        }
    }

    render() {
        this.domElement.innerHTML = `
            <div id="sounds-grid-header">
                <div class="sounds-cell">Name</div>
                <div class="sounds-cell">Type</div>
                <div class="actions-cell">Actions</div>
            </div>
            <div id="sounds-grid"></div>
            <div id="sounds-pagination"><div id="pages"></div></div>
            <div class="modals"></div>

        `;

        this.grid = this.domElement.querySelector("#sounds-grid");


        if (this.data) {
            for (let row of this.data) {
                this.soundRow = new SoundRow(this.grid, row, () => { this.getData() });
                this.soundRow.render();
                this.soundRow.deleteHandler = (id) => {
                    SoundsGridRepository.deleteSound(id, () => { this.getData() });
                }
            }
        }
    }

}

export default SoundsGrid;