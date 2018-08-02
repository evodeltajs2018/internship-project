import Component from "../../components/Component";
import Button from "../button/Button";
import Modal from "../modal/Modal";
import "./Card.scss";

class Card extends Component {
    constructor(container, project) {
        super(container, "card");
        this.project = project;
    }

    deleteButtonHandler(idProjectParam) {
        this.modal = new Modal(document.querySelector(".modals"), "Delete Project", "Are you sure you want to delete this project?");
        this.modal.render();
        this.modal.id = idProjectParam;
        this.modal.repo = this.repo;
        this.modal.cardUnrender = () => {
            this.unrender();
        };
        document.getElementsByClassName("modal")[0].style.display = "block";
    }

    openButtonHandler(idProjectParam) {
    }

    editButtonHandler(idProjectParam) {
    }

    render() {
        this.domElement.innerHTML = `
        <div class="cardHeader content"><i class="fa fa-times-circle deleteButton"></i> <div>${this.project.title}<br>${this.project.genre}</div></div>

        <div class="cardBody content">
        <p class="cardText">${this.project.description}</p></div>

        <div class="cardFooter content"><div class="cardDescription">Description</div>
        </div>
        `;

        let idProject = this.project.id;

        this.domElement.querySelector(".deleteButton").addEventListener("click", () => {
            this.deleteButtonHandler(idProject);
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