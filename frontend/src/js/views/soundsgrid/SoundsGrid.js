import "./SoundsGrid.scss";
import "./Row.scss";
import Component from "../../components/Component";
import SoundRepository from "../../repositories/SoundRepository";

import SoundRow from "./soundrow/SoundRow";
import Pagination from "../../components/pagination/Pagination";
import Modal from "../../components/modal/Modal";
import Navigator from "../../services/router/Navigator";
import SoundFilter from "./filter/SoundFilter";
import Engine from "../splicer/engine/Engine";

class SoundsGrid extends Component {
    constructor(container) {
        super(container, "sounds-grid-container");

        this.pagination = new Pagination(this.domElement, (page) => {
            this.goToPage(page)
        });
        this.data = [];
        this.setup();
        this.getData();
    }

    getData(filter = {
        name: "",
        type: ""
    }) {
        SoundRepository.getAllSounds({
                currentPage: this.pagination.currentPage,
                itemsPerPage: this.pagination.itemsPerPage,
            },
            filter
        ).then(
            (data) => {
                if (data) {
                    this.data = data.data;
                    this.render();
                    this.setupPagination(data);

                    if (this.pagination.pageCount < this.pagination.currentPage) {
                        this.goToPage(this.pagination.pageCount);
                    }
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
        if (page > 0) {
            this.pagination.currentPage = page;
            this.getData(this.filterBar.getFilterData());
        }
    }

    setup() {
        this.domElement.innerHTML = `
            <div id="filter-bar"></div>
            <div id="element-grid-header">
                <div class="element-cell-sound">Name</div>
                <div class="element-cell-sound">Type</div>
                <div class="actions-cell">Actions</div>
            </div>
            <div id="sounds-grid"></div>
            <div class="sounds-pagination"></div>
            <div class="modals"></div>
        `;
        this.filterBar = new SoundFilter(this.domElement.querySelector("#filter-bar"), "filter-bar", (filter) => this.getData(filter));
        this.filterBar.render();
        
    }

    deletehandler(id) {
        let modal = new Modal(
            this.domElement.querySelector(".modals"),
            "Delete sound",
            "Are you sure you want to delete this sound?"
        );
        modal.onConfirm = () => {
            SoundRepository.deleteSound(id).then(() => {
                this.getData(this.filterBar.getFilterData())
            });
        }
        modal.render();
    }

    renderTable() {
        this.grid = this.domElement.querySelector("#sounds-grid");
        if (this.data.length) {
            for (let row of this.data) {
                this.soundRow = new SoundRow(this.grid, row, () => {
                    this.getData()
                });
                this.soundRow.render();
                this.soundRow.deleteHandler = (id) => this.deletehandler(id);
                this.soundRow.editHandler = (id) => {
                    Navigator.goToUrl("/sound/" + id);
                }
            }
        } else {
            this.domElement.querySelector("#sounds-grid").innerHTML = `<div class="no-sounds">No sounds</div>`;
        }
    }

    render() {
        this.domElement.querySelector("#sounds-grid").innerHTML = "";
        this.domElement.querySelector(".sounds-pagination").innerHTML = "";
        this.renderTable();
        this.pagination.domElement = this.domElement.querySelector(".sounds-pagination");
        this.pagination.render();
    }
}

export default SoundsGrid;