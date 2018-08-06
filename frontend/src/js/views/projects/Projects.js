import Component from "../../components/Component";
import ProjectsRepository from "../../repositories/ProjectsRepository";
import AddingCard from "../../components/card/AddingCard";
import Card from "../../components/card/Card";
import Search from "../../components/search/Search";

class Projects extends Component {
	constructor(container) {
		super(container, "projects");

		this.data = null;

		this.getData();

	}

	getData() {
		ProjectsRepository.getData((data) => {
			this.data = data;
			this.render();
		});
	}

	deleteProject(id){
		ProjectsRepository.deleteProject(id, () => {
			this.getData();
		});
	}
	
	render() {
		
		this.domElement.innerHTML = `<div class="searches"></div><div class="modals"></div><div class="cards"></div>`;

		this.search = new Search(this.domElement.querySelector(".searches"),"Name");
		this.search.render();

		this.search = new Search(this.domElement.querySelector(".searches"),"Genre");
		this.search.render();

		if (this.data) {
			for (let project of this.data) {
				this.card = new Card(this.domElement.querySelector(".cards"), project);
				this.card.onDelete = (id) => {
					this.deleteProject(id);
				};
				this.card.render();
			}
		}

		this.addingCard = new AddingCard(this.domElement.querySelector(".cards"));
		this.addingCard.render();
		
	}
}

export default Projects;