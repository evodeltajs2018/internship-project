import Component from "../../components/Component";
import ProjectRepository from "../../repositories/ProjectRepository";
import AddingCard from "../../components/card/AddingCard";
import Card from "../../components/card/Card";
import Search from "../../components/search/Search";
import "./Projects.scss";

class Projects extends Component {
	constructor(container) {
		super(container, "projects");

		this.pagination = {
			currentPage: 1,
			itemsPerPage: 2,
		};

		this.filter = {
			name: "",
			genreName: ""
		};

		this.observer;

		this.render();
	}

	projectObserver() {
		// const c = document.getElementsByClassName('card');
		// let box = c[c.length - 1];
		let boxElement = document.getElementById('loading');
		let that = this;

		var options = {
			root: null,
			rootMargin: "0px",
			threshold: [1]
		};

		this.observer = new IntersectionObserver(that.handleIntersect.bind(that), options);
		this.observer.observe(boxElement);
	}

	handleIntersect(entries, observer) {
		let that = this;
		let boxElement = document.getElementById('loading');
		if (entries) {
			entries.forEach(function (entry) {
				console.log("ratio: " + entry.intersectionRatio);
				if (entry.intersectionRatio == 1) {
					that.getProjects();
					observer.unobserve(boxElement);
				}
			});
		} else {
			that.getProjects();
			observer.unobserve(boxElement);
		}
	}

	getProjects() {
		let boxElement = document.getElementById('loading');
		this.observer.unobserve(boxElement);
		ProjectRepository.getProjects(this.pagination, this.filter).then((data) => {

			console.log(this.pagination.currentPage + "  --  " + data.currentPage + "  --  " + data.pageCount + "  --  " + this.filter.name);
			if (this.pagination.currentPage <= data.pageCount) {
				this.pagination.currentPage++;

				console.log(data);
				this.addCards(data.data);
				if (this.pagination.currentPage > data.pageCount) {
					this.hideLoadingArea(true);
				}
			}
			if (data.data.length > 0) {
				this.projectObserver();
			} else {
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
		this.getProjects();
	}

	populateFilter() {
		this.filter.name = this.searchTitle.domElement.querySelector(".search-input").value;
		this.filter.genreName = this.searchGenre.domElement.querySelector(".search-input").value;

		this.filterProjects();
	}

	initializeCards() {
		this.domElement.querySelector(".cards").innerHTML = "";
		this.hideLoadingArea(false);

		this.addingCard = new AddingCard(this.domElement.querySelector(".cards"));
		this.addingCard.render();

		this.pagination = {
			currentPage: 1,
			itemsPerPage: 2,
		};

		console.log("name: " + this.filter.name);

		//this.projectObserver();
	}

	hideLoadingArea(isHidden) {
		document.getElementById("loading").style.display = isHidden ? "none" : "flex";
	}

	render() {
		this.domElement.innerHTML = `
			
		<div class="searches"></div>
		<div class="modals"></div>
		<div class="cards"></div>
		<div id="loading" class="loading">
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
		this.projectObserver();
	}
}

export default Projects;