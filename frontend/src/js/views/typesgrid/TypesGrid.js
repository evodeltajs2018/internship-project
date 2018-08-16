import "./TypesGrid.scss";
import Component from "../../components/Component";
import SoundTypeRepository from "../../repositories/SoundTypeRepository";

import TypeRow from "./typerow/TypeRow";
import Pagination from "../../components/pagination/Pagination";
import Modal from "../../components/modal/Modal";
import Navigator from "../../services/router/Navigator";
import TypeFilter from "./filter/TypeFilter";

class TypesGrid extends Component {
    constructor(container) {
        super(container, "types-grid-container");

        this.pagination = new Pagination(this.domElement, (page) => { this.goToPage(page) }, 'types');
        this.data = [];
        this.setup();
        this.getData();
    }

    getData(filter = { name: "" }) {
        SoundTypeRepository.getAllTypes(
            {
                currentPage: this.pagination.currentPage,
                itemsPerPage: this.pagination.itemsPerPage,
            },
            filter
        ).then(
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
        if (page > 0) {
            this.pagination.currentPage = page;
            this.getData(this.filterBar.getFilterData());
        }
    }

    setup() {
        this.domElement.innerHTML = `
            <div id="filter-bar"></div>
            <div id="types-grid-header">
                <div class="types-cell">Name</div>
                <div class="types-cell">Color</div>
                <div class="types-cell">Icon</div>
                <div class="actions-cell">Actions</div>
            </div>
            <div id="types-grid"></div>
            <div class="sounds-pagination"></div>
            <div class="modals"></div>
        `;
        this.filterBar = new TypeFilter(this.domElement.querySelector("#filter-bar"), "filter-bar", (filter) => this.getData(filter));
        this.filterBar.render();
    }

    deletehandler(id) {
        let modal = new Modal(
            this.domElement.querySelector(".modals"),
            "Delete type",
            "Are you sure you want to delete this type?"
        );
        modal.onConfirm = () => {
            SoundTypeRepository.deleteSound(id).then(() => { this.getData(this.filterBar.getFilterData()) });
        }
        modal.render();
    }

    renderTable() {
        this.grid = this.domElement.querySelector("#types-grid");
        if (this.data.length) {
            for (let row of this.data) {
                this.TypeRow = new TypeRow(this.grid, row, () => { this.getData() });
                this.TypeRow.render();
                this.TypeRow.deleteHandler = (id) => this.deletehandler(id);
                this.TypeRow.editHandler = (id) => { Navigator.goToUrl("/type/" + id); }
            }
        } else {
            this.domElement.querySelector("#types-grid").innerHTML = `<div class="no-types">No types</div>`;
        }
    }

    render() {
        this.domElement.querySelector("#types-grid").innerHTML = "";
        this.domElement.querySelector(".sounds-pagination").innerHTML = "";
        this.renderTable();
        this.pagination.domElement = this.domElement.querySelector(".sounds-pagination");
        this.pagination.render();
    }
}

export default TypesGrid;