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
			itemsPerPage: 2,
		};
		this.filter = {
			name: "",
			genreName: ""
		};

		this.prevRatio = 0.0;
		this.increasingColor = "rgba(40, 40, 190, ratio)";
		this.decreasingColor = "rgba(190, 40, 40, ratio)";

		this.render();
		this.getProjects();
	}

	projectObserver() {
		const c = document.getElementsByClassName('card');
		let box = c[c.length - 1];
		let boxElement = document.getElementsByClassName('loading')[0];
		

		var options = {
			root: null,
			rootMargin: "0px",
			threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
		};

		//	observer = new IntersectionObserver(that.handleIntersect.bind(that), options);
		let observer = new IntersectionObserver(this.handleIntersect, options);
		observer.observe(boxElement);
	}

	handleIntersect(entries, observer) {
		console.log(this);
		entries.forEach(function (entry) {
			console.log(entry.intersectionRatio);
			// if (entry.intersectionRatio > 0.75) {
			// 	console.log('out');
			// 	entry.target.style.backgroundColor = this.increasingColor.replace("ratio", entry.intersectionRatio);
			// } else {
			// 	console.log('in');
			// 	entry.target.style.backgroundColor = this.decreasingColor.replace("ratio", entry.intersectionRatio);
			// }

			// this.prevRatio = entry.intersectionRatio;
		
			// if (entry.intersectionRatio == 1)
			// 	this.getProjects();
		});
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
			this.projectObserver();
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
		this.hideLoadingArea(false);

		this.addingCard = new AddingCard(this.domElement.querySelector(".cards"));
		this.addingCard.render();
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
	}
}

export default Projects;