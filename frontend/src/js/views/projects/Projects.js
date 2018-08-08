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

	cardCreator(project) {
		this.card = new Card(this.domElement.querySelector(".cards"), project);
		this.card.render();
		this.card.onDelete = (id) => {
			this.deleteProject(id);
		};

	}
	
	deleteProject(id) {
		ProjectsRepository.deleteProject(id, () => {
			this.getData();
		});
	}

	filterProjectsByTitle(inputValue) {
		const filterProjects = this.data.filter((project) =>
			project.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
		);
		this.domElement.querySelector(".cards").innerHTML = "";
		if (filterProjects) {
			for (let i = 0; i < filterProjects.length; i++) {
				this.cardCreator(filterProjects[i]);
				this.domElement.querySelector(".cards").appendChild(this.card.domElement);
			}
		}
		this.addingCard.render();
		this.domElement.querySelector(".cards").appendChild(this.addingCard.domElement);
	}

	filterProjectsByGenre(inputValue) {
		const filterProjects = this.data.filter((project) =>
			project.genre.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
		);
		this.domElement.querySelector(".cards").innerHTML = "";
		if (filterProjects) {
			for (let i = 0; i < filterProjects.length; i++) {
				this.cardCreator(filterProjects[i]);
				this.domElement.querySelector(".cards").appendChild(this.card.domElement);
			}
		}
		this.addingCard.render();
		this.domElement.querySelector(".cards").appendChild(this.addingCard.domElement);
	}

	render() {

		this.domElement.innerHTML = `<div class="searches"></div><div class="modals"></div><div class="cards"></div>`;

		this.searchTitle = new Search(this.domElement.querySelector(".searches"), "Name");
		this.searchTitle.render();
		this.searchTitle.domElement.querySelector(".search-input").addEventListener("input", () => {
			if (this.searchTitle.domElement.querySelector(".search-input").value == "") {
				this.render();
			} else {
				this.filterProjectsByTitle(this.searchTitle.domElement.querySelector(".search-input").value);
			}
		})

		this.searchGenre = new Search(this.domElement.querySelector(".searches"), "Genre");
		this.searchGenre.render();
		this.searchGenre.domElement.querySelector(".search-input").addEventListener("input", () => {
			if (this.searchGenre.domElement.querySelector(".search-input").value == "") {
				this.render();
			} else {
				this.filterProjectsByGenre(this.searchGenre.domElement.querySelector(".search-input").value);
			}
		})

		if (this.data) {
			for (let project of this.data) {
				this.cardCreator(project);
			}
		}

		this.addingCard = new AddingCard(this.domElement.querySelector(".cards"));
		this.addingCard.render();

	}
}

export default Projects;