import "./SoundsGrid.scss";
import Component from "../../components/Component";
import SoundsGridRepository from "../../repositories/SoundsGridRepository";
import SoundRow from "./soundrow/SoundRow";
import Pagination from "../../components/pagination/Pagination";
import Modal from "../../components/modal/Modal";
import Navigator from "../../services/router/Navigator";

class SoundsGrid extends Component {
    constructor(container) {
        super(container, "sounds-grid-container");

        this.pagination = new Pagination(this.domElement, (page) => { this.goToPage(page) });
        this.getData();
    }

    getData() {
        SoundsGridRepository.getData(
            {
                currentPage: this.pagination.currentPage,
                itemsPerPage: this.pagination.itemsPerPage
            },
            (data) => {
                this.data = data.data;
                this.render();
                this.setupPagination(data);
                
                if (this.pagination.pageCount < this.pagination.currentPage) {
                    this.goToPage(this.pagination.pageCount);
                }
            });
    }

    setupPagination(data) {
        this.pagination.pageCount = data.pageCount;
        this.pagination.itemsThisPage = data.data.length;
        this.pagination.itemCount = data.itemCount;
        this.pagination.setup();
    }

    goToPage(page) {
        this.pagination.currentPage = page;
        this.getData();
    }

    render() {
        this.domElement.innerHTML = `
            <div id="sounds-grid-header">
                <div class="sounds-cell">Name</div>
                <div class="sounds-cell">Type</div>
                <div class="actions-cell">Actions</div>
            </div>
            <div id="sounds-grid"></div>
            <div class="sounds-pagination"></div>
            <div class="modals"></div>
        `;

        this.grid = this.domElement.querySelector("#sounds-grid");
        if (this.data) {
            for (let row of this.data) {
                this.soundRow = new SoundRow(this.grid, row, () => { this.getData() });
                this.soundRow.render();
                this.soundRow.deleteHandler = (id) => {
                    let modal = new Modal(this.domElement.querySelector(".modals"), "Delete sound", "Are you sure you want to delete this sound?");
                    modal.onConfirm = () => {
                        SoundsGridRepository.deleteSound(id, () => { this.getData() });
                    }
                    modal.render();
                }

                this.soundRow.editHandler = (id) => {
                    Navigator.goToUrl("/sound/" + id);
                }
            }
        }

        this.pagination.domElement = this.domElement.querySelector(".sounds-pagination");
        this.pagination.render();
    }
}

export default SoundsGrid;