import Component from "../../../components/Component";

class TypeRow extends Component {
    constructor(container, type) {
        super(container, "element-grid-row");

        this.type = type;
    }

    render() {
        this.domElement.innerHTML = `
            <div class="element-cell-type element-name">${this.type.name}</div>
            <div class="element-cell-type element-type">
                <div class="element-color" style="background-color: ${this.type.color}"></div>
            </div>
            <div class="element-cell-type element-icon">
            </div>
            <div class="actions-cell element-action-buttons"></div>
        `;

        if (this.type.src != null) {
            this.domElement.querySelector('.element-icon').innerHTML = `<img class="icon-type" src="${this.type.src}" alt="${this.type.name} icon">`;
        } else {
            this.domElement.querySelector('.element-icon').innerHTML = `No Icon`;
        }

        this.editButton = document.createElement("i");
        this.editButton.className = "fas fa-pen";
        this.domElement.querySelector(".element-action-buttons")
            .appendChild(this.editButton);

        this.deleteButton = document.createElement("i");
        this.deleteButton.className = "fas fa-trash";
        this.domElement.querySelector(".element-action-buttons")
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