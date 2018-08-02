import Component from "../../components/Component";
import ProjectsRepository from "../../repositories/ProjectsRepository";
import AddingCard from "../../components/card/AddingCard";
import Card from "../../components/card/Card";
import Modal from "../../components/modal/Modal";

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

	deleteProject(id) {
		this.projectsRepo.deleteProject(id);
	}

	render() {

		this.domElement.innerHTML = `<div class="modals"></div><div class="cards"></div>`;

		// const data = JSON.parse(JSON.stringify(this.data));

		if (this.data) {
			for (let project of this.data) {
				this.card = new Card(this.domElement.querySelector(".cards"), project);
				this.card.repo = this.projectsRepo;
				this.card.render();
			}
		}

		this.addingCard = new AddingCard(this.domElement.querySelector(".cards"));
		this.addingCard.render();
	}
}

export default Projects;