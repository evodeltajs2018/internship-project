import Component from "../../components/Component";
import ProjectRepository from "../../repositories/ProjectRepository";
import AddingCard from "../../components/card/AddingCard";
import Card from "../../components/card/Card";
import Search from "../../components/search/Search";
import "./Projects.scss";

class Projects extends Component {
	constructor(container) {
		super(container, "projects");

		this.displayData = null;

		this.pagination = {
			currentPage: 1,
			itemsPerPage: 10,
		};
		this.filter = {
			name: "",
			genreName: ""
		};

		this.render();
		this.getProjects();
		//this.projectObserver();

		//var that = this;

		window.addEventListener("load", 
			this.createObserver(),
		 false);
	}

	createObserver() {
		var options = {
			root: null,
			rootMargin: "0px",
			threshold: [1,0]
		};
		let loadingElement = document.querySelector("#loading");
		let observer = new IntersectionObserver(this.handleIntersect, options);
		observer.observe(loadingElement);
	}

	handleIntersect(entries) {
		if (entries) {
			console.log(entries[0].intersectionRatio);
			if (entries[0].intersectionRatio == 1) {
				this.getProjects();
			}
		} else {
			this.getProjects();
		}
	}

	getProjects() {
		//console.log(this.pagination);
		ProjectRepository.getProjects(this.pagination, this.filter).then((data) => {
			this.displayData = data.data;

			//	console.log(this.pagination.currentPage + "  --  " + data.pageCount);
			if (this.pagination.currentPage <= data.pageCount) {
				this.pagination.currentPage++;

				this.addCards(this.displayData);
				if (this.pagination.currentPage > data.pageCount)
					this.hideLoadingArea(true);
			}
		});
	}

	addCards(projects) {
		if (projects) {
			for (let project of projects) {
				this.cardCreator(project);
			}
		}
	}

	cardCreator(project) {
		this.card = new Card(this.domElement.querySelector(".cards"), project);
		this.card.render();
		this.card.onDelete = (id) => {
			this.deleteProject(id);
		};
	}

	deleteProject(id) {
		ProjectRepository.deleteProject(id).then(() => {
			this.getProjects();
		});
	}

	filterProjects() {
		this.initializeCards();
		this.handleIntersect();
	}

	populateFilter() {
		this.filter.name = this.searchTitle.domElement.querySelector(".search-input").value;
		this.filter.genreName = this.searchGenre.domElement.querySelector(".search-input").value;

		this.filterProjects();
	}

	initializeCards() {
		this.domElement.querySelector(".cards").innerHTML = "";
		this.pagination = {
			currentPage: 1,
			itemsPerPage: 10,
		}
		this.hideLoadingArea(false);

		this.addingCard = new AddingCard(this.domElement.querySelector(".cards"));
		this.addingCard.render();
	}

	hideLoadingArea(isHidden) {
		document.getElementById("loading").style.display = isHidden ? "none" : "flex";
	}

	render() {
		this.domElement.innerHTML = `
			<div class="searches">
			</div>
			<div class="modals">
			</div>
			<div class="cards">
			</div>
			<div id="loading">
				<i>Loading ...</i>
			</div>
		`;

		this.searchTitle = new Search(this.domElement.querySelector(".searches"), "Name");
		this.searchTitle.render();
		this.searchTitle.domElement.querySelector(".search-input").addEventListener("keyup", () => {
			this.populateFilter();
		})

		this.searchGenre = new Search(this.domElement.querySelector(".searches"), "Genre");
		this.searchGenre.render();
		this.searchGenre.domElement.querySelector(".search-input").addEventListener("keyup", () => {
			this.populateFilter();
		})

		this.initializeCards();
	}
}

export default Projects;