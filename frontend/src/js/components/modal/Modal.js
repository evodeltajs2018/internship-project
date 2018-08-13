import Component from "../Component";
import Button from "../button/Button";
import "./Modal.scss";

class Modal extends Component {
    constructor(container, title, text) {
        super(container, "modal");
        this.title = title;
        this.text = text;
    }

    render() {
        this.domElement.innerHTML = `
        <div class="modal-content">
            <div class="modal-header"><span class="modal-title">${this.title}</span><i class="fa fa-close close-icon"></i></div>
            <div class="modal-body">${this.text}</div>
            <div class="modal-footer"></div>
        </div>
        `

        this.domElement.querySelector(".close-icon").addEventListener("click", () => {
            this.unrender();
            document.querySelector("body").style.overflow = "auto";
        });

        this.confirmButton = new Button(this.domElement.querySelector(".modal-footer"), "Confirm", "confirm-button", () => {
            this.onConfirm();
            document.querySelector("body").style.overflow = "auto";
            this.unrender();
        });
        this.confirmButton.render();

        this.cancelButton = new Button(this.domElement.querySelector(".modal-footer"), "CANCEL", "cancel-button", () => {
            this.unrender();
            document.querySelector("body").style.overflow = "auto";
        });
        this.cancelButton.render();
    }

}

export default Modal;