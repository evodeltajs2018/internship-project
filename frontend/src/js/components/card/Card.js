import Component from "../../components/Component";
import Navigator from "../../services/router/Navigator";
import Button from "../button/Button";
import Modal from "../modal/Modal";
import "./Card.scss";

class Card extends Component {
    constructor(container, project) {
        super(container, "card");
        this.project = project;
    }

    deleteButtonHandler() {
        this.modal = new Modal(document.querySelector(".modals"), "Delete Project", "Are you sure you want to delete this project?");
        this.modal.render();
        this.modal.onConfirm = () => {
            this.onDelete(this.project.id);
        };
    }
 
    openButtonHandler(idProjectParam) {

    }

    editButtonHandler(idProjectParam) {
        Navigator.goToUrl("/project/" + idProjectParam);
    }

    render() {
        this.domElement.innerHTML = `
        <div class="cardHeader content"><i class="fa fa-times-circle deleteIcon"></i> <div>${this.project.name}<br>${this.project.genre.name}</div></div>

        <div class="cardBody content">
        <p class="cardText">${this.project.description}</p></div>

        <div class="cardFooter content">
        </div>
        `;

        let idProject = this.project.id;

        this.domElement.querySelector(".deleteIcon").addEventListener("click", () => {
            this.deleteButtonHandler();
        });

        this.openButton = new Button(this.domElement.querySelector(".cardFooter"), "OPEN", "leftButton cardButton", () => {
            this.openButtonHandler(idProject);
        });
        this.openButton.render();

        this.editButton = new Button(this.domElement.querySelector(".cardFooter"), "EDIT", "rightButton cardButton", () => {
            this.editButtonHandler(idProject)
        });
        this.editButton.render();
    }

}

export default Card;