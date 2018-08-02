import Component from "../Component";
import Button from "../button/Button";
import "./Modal.scss";

class Modal extends Component {
    constructor(container, title, text) {
        super(container, "modal");
        this.title = title;
        this.text = text;
    }

    confirmButtonHandler() {
        this.repo.deleteProject(this.id, () => { this.cardUnrender() });
        this.domElement.parentNode.innerHTML = "";

    }

    render() {
        this.domElement.innerHTML = `
        <div class="modalContent">
            <div class="modalHeader"><span class="modalTitle">${this.title}</span><i class="fa fa-close closeButton"></i></div>
            <div class="modalBody">${this.text}</div>
            <div class="modalFooter"></div>
        </div>
        `

        this.domElement.querySelector(".closeButton").addEventListener("click", () => {
            this.domElement.parentNode.innerHTML = "";
        });

        this.confirmButton = new Button(this.domElement.querySelector(".modalFooter"), "Confirm", "confirmButton", () => {
            this.confirmButtonHandler();
        });
        this.confirmButton.render();

        this.cancelButton = new Button(this.domElement.querySelector(".modalFooter"), "CANCEL", "cancelButton", () => {
            this.domElement.parentNode.innerHTML = "";
        });
        this.cancelButton.render();
    }

}

export default Modal;