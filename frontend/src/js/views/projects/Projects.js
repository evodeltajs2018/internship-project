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
			itemsPerPage: 10,
		};

		this.filter = {
			name: "",
			genreName: ""
		};

		var observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: [1]
		};

		let that = this;
		this.observer = new IntersectionObserver(that.handleIntersect.bind(that), observerOptions);\
		
	///////start
		this.cards = [];
		this.currentlyPlaying = null;
        this.audioContext = new AudioContext();
		
		this.setPlayingCard = (projectId) => {
			this.setPlayingCardHandler(projectId);
		}
		this.getProjectsAndTracks();
	////end
		this.render();
	}


	projectObserver(isObservable) {
		let boxElement = document.getElementById('loading');

		if (isObservable) {
			this.observer.observe(boxElement);
		} else {
			this.observer.unobserve(boxElement);
		}
	}

	handleIntersect(entries) {
		let that = this;
		if (entries) {
			entries.forEach(function (entry) {
				if (entry.intersectionRatio == 1) {
					that.getProjectsAndTracks();
				}
			});
		} else {
			that.getProjectsAndTracks();
		}
	}

	getProjectsAndTracks() {
		this.getProjects().then(() => {
			for (let card of this.cards) {
				card.loadTracks();
			}
		});
	}
	
	setPlayingCardHandler(projectId) {
		for (let card of this.cards) {
			if (card.engine.isPlaying &&  card.project.id != projectId) {
				card.engine.stop();
			}
		}
	}
	
	getProjects() {
		this.projectObserver(false)
		return ProjectRepository.getProjects(this.pagination, this.filter).then((data) => {

			if (this.pagination.currentPage <= data.pageCount) {
				this.pagination.currentPage++;

				this.addCards(data.data);
				if (this.pagination.currentPage > data.pageCount) {
					this.hideLoadingArea(true);
				}
			}
			if (data.data.length > 0) {
				this.projectObserver(true);
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
		let card = new Card(
			this.domElement.querySelector(".cards"), 
			project, 
			this.audioContext,
			this.setPlayingCard
		);
		this.cards.push(card);
		card.render();
		card.onDelete = (id) => {
			this.deleteProject(id);
		};
	}

	deleteProject(id) {
		ProjectRepository.deleteProject(id).then(() => {
			this.filterProjects();
		});
	}

	filterProjects() {
		this.initializeCards();
		this.getProjectsAndTracks();
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

		this.pagination.currentPage = 1;
	}

	hideLoadingArea(isHidden) {
		document.getElementById("loading").style.display = isHidden ? "none" : "flex";
	}

	render() {
		this.domElement.innerHTML = `
			
		<div class="searches"></div>
		<div class="modals"></div>
		<div class="cards"></div>
		<div class="loading">
			<div id="loading" class="loading">
				<i>Loading ...</i>
			</div>
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
		this.projectObserver(true);
	}
}

export default Projects;