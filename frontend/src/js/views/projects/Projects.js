import Component from "../../components/Component";
import ProjectsRepository from "../../repositories/ProjectsRepository";
import AddingCard from "../../components/card/AddingCard";
import Card from "../../components/card/Card";
import Search from "../../components/search/Search";

class Projects extends Component {
	constructor(container) {
		super(container, "projects");

		this.data = null;
		this.displayData = null;

		this.getData();

	}

	getData() {
		ProjectsRepository.getData((data) => {
			this.data = data;
			this.displayData = data;
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

	filterProjects(inputValue, property) {
		this.displayData = this.displayData.filter((project) =>
			project[property].toLowerCase().indexOf(inputValue.toLowerCase()) > -1
		);
		this.domElement.querySelector(".cards").innerHTML = "";
		if (this.displayData) {
			for (let i = 0; i < this.displayData.length; i++) {
				this.cardCreator(this.displayData[i]);
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
		this.searchTitle.domElement.querySelector(".search-input").addEventListener("change", () => {
			if (this.searchTitle.domElement.querySelector(".search-input").value == "") {
				this.displayData = this.data;
				this.render();
			} else {
				this.filterProjects(this.searchTitle.domElement.querySelector(".search-input").value, "title");
			}
		})

		this.searchGenre = new Search(this.domElement.querySelector(".searches"), "Genre");
		this.searchGenre.render();
		this.searchGenre.domElement.querySelector(".search-input").addEventListener("change", () => {
			if (this.searchGenre.domElement.querySelector(".search-input").value == "") {
				this.displayData=this.data;
				this.render();
			} else {
				this.filterProjects(this.searchGenre.domElement.querySelector(".search-input").value, "genre");
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