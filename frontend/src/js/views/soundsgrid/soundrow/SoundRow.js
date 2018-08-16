import Component from "../../../components/Component";

class SoundRow extends Component {
    constructor(container, sound) {
        super(container, "element-grid-row");

        this.sound = sound;
    }

    render() {
        this.domElement.innerHTML = `
            <div class="element-cell-sound element-name">${this.sound.name}</div>
            <div class="element-cell-sound element-type">${this.sound.type.name}</div>
            <div class="actions-cell element-action-buttons"></div>
        `;

        this.editButton = document.createElement("i");
        this.editButton.className = "fas fa-pen";
        this.domElement.querySelector(".element-action-buttons")
            .appendChild(this.editButton);

        this.deleteButton = document.createElement("i");
        this.deleteButton.className = "fas fa-trash";
        this.domElement.querySelector(".element-action-buttons")
            .appendChild(this.deleteButton);

        this.editButton.addEventListener("click", () => {
            this.editHandler(this.sound.id);
        });

        this.deleteButton.addEventListener("click", () => {
            this.deleteHandler(this.sound.id);
        });
    }
}

export default SoundRow;