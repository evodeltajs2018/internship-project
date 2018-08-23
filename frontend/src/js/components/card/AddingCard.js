import Component from "../../components/Component";
import Navigator from "../../services/router/Navigator";
import "./AddingCard.scss";

class AddingCard extends Component {
    constructor(container) {
        super(container, "adding-card");
    }

    addProject() {
        Navigator.goToUrl("/project");
    }

    render() {
        this.domElement.innerHTML = `<div class="adding-card-image"><i class="fa fa-plus-circle add-button"></i></div><div class="adding-card-text">ADD NEW PROJECT</div>`;

        this.domElement.querySelector(".adding-card-image").addEventListener("click", () => {
            this.addProject();
        });
    }

}

export default AddingCard;