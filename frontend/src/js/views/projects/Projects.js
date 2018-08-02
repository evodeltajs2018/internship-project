import Component from "../../components/Component";
import ProjectsRepository from "../../repositories/ProjectsRepository";
<<<<<<< HEAD
=======
import AddingCard from "../../components/card/AddingCard";
import Card from "../../components/card/Card";
import Modal from "../../components/modal/Modal";
>>>>>>> dev

class Projects extends Component {
	constructor(container) {
		super(container, "projects");

		this.projectsRepo = new ProjectsRepository();

		this.data = null;

		this.getData();

	}

	getData() {
		this.projectsRepo.getData((data) => {
			this.data = data;
			this.render();
		});
	}

	render() {

		this.domElement.innerHTML = `<div class="cards"><div class="modals"></div></div>`;

		const data = JSON.parse(JSON.stringify(this.data));

		if(data){
			for (let project of data.projects){
				this.card = new Card(this.domElement.querySelector(".cards"),project);
				this.card.render();
			}
		}

		this.addingCard = new AddingCard(this.domElement.querySelector(".cards"));
		this.addingCard.render();

		this.modal = new Modal(this.domElement.querySelector(".modals"),"Delete Project","Are you sure you want to delete this project?");
		this.modal.render();
		this.modal.closeButtonHandler();
	}
}

export default Projects;