import Component from "../../../components/Component";
import "./SoundRow.scss";

class SoundRow extends Component {
    constructor(container, sound) {
        super(container, "sounds-grid-row");

        this.sound = sound;
    }

    render() {
        this.domElement.innerHTML = `
            <div class="sounds-cell sound-name">${this.sound.name}</div>
            <div class="sounds-cell sound-type">${this.sound.type.name}</div>
            <div class="actions-cell sound-action-buttons"></div>
        `;

        this.editButton = document.createElement("i");
        this.editButton.className = "fas fa-pen";
        this.domElement.querySelector(".sound-action-buttons")
            .appendChild(this.editButton);

        this.deleteButton = document.createElement("i");
        this.deleteButton.className = "fas fa-trash";
        this.domElement.querySelector(".sound-action-buttons")
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