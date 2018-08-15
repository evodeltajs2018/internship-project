import Component from "../../../components/Component";
import "./TypeRow.scss";

class TypeRow extends Component {
    constructor(container, type) {
        super(container, "types-grid-row");

        this.type = type;
    }

    render() {
        this.domElement.innerHTML = `
            <div class="types-cell type-name">${this.type.name}</div>
            <div class="types-cell type-type">
                <div class="color-type" style="background-color: ${this.type.color}"></div>
            </div>
            <div class="types-cell type-icon">
            </div>
            <div class="actions-cell type-action-buttons"></div>
        `;

        if (this.type.src != null) {
            this.domElement.querySelector('.type-icon').innerHTML = `<img class="icon-type" src="${this.type.src}" alt="${this.type.name} icon">`;
        } else {
            this.domElement.querySelector('.type-icon').innerHTML = `No Icon`;
        }

        this.editButton = document.createElement("i");
        this.editButton.className = "fas fa-pen";
        this.domElement.querySelector(".type-action-buttons")
            .appendChild(this.editButton);

        this.deleteButton = document.createElement("i");
        this.deleteButton.className = "fas fa-trash";
        this.domElement.querySelector(".type-action-buttons")
            .appendChild(this.deleteButton);

        this.editButton.addEventListener("click", () => {
            this.editHandler(this.type.id);
        });

        this.deleteButton.addEventListener("click", () => {
            this.deleteHandler(this.type.id);
        });
    }
}

export default TypeRow;