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
        <div class="modalContent">
            <div class="modalHeader"><span class="modalTitle">${this.title}</span><i class="fa fa-close closeIcon"></i></div>
            <div class="modalBody">${this.text}</div>
            <div class="modalFooter"></div>
        </div>
        `

        this.domElement.querySelector(".closeIcon").addEventListener("click", () => {
            this.unrender();
        });

        this.confirmButton = new Button(this.domElement.querySelector(".modalFooter"), "Confirm", "confirmButton", () => {
            this.onConfirm();
            this.unrender();
        });
        this.confirmButton.render();

        this.cancelButton = new Button(this.domElement.querySelector(".modalFooter"), "CANCEL", "cancelButton", () => {
            this.unrender();
        });
        this.cancelButton.render();
    }

    unrender(){
        this.domElement.parentNode.innerHTML = "";
    }
}

export default Modal;