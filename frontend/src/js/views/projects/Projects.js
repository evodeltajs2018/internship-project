import Component from "../../components/Component";
import ProjectRepository from "../../repositories/ProjectRepository";
import AddingCard from "../../components/card/AddingCard";
import Card from "../../components/card/Card";
import Search from "../../components/search/Search";
import "./Projects.scss";
import TokenService from "../../services/auth/TokenService";

class Projects extends Component {
	constructor(container) {
		super(container, "projects");

		this.data = null;
		this.displayData = null;
		this.filter = {};
		this.cards = [];
		this.currentlyPlaying = null;
		this.audioContext = new AudioContext();

		this.setPlayingCard = (projectId) => {
			this.setPlayingCardHandler(projectId);
		}
		this.getProjectsAndTracks();

	}

	getProjectsAndTracks() {
		this.getProjects().then(() => {
			for (let card of this.cards) {
				card.loadTracks();
			}
		});
	}

	allCards(array) {
		this.domElement.querySelector(".cards").innerHTML = "";

		this.addingCard = new AddingCard(this.domElement.querySelector(".cards"));
		this.addingCard.render();

		if (this.displayData) {
			for (let project of this.displayData) {
				project.isEditable = false;
				if (project.userEmail === jwt_decode(TokenService.getToken()).email) {
					project.isEditable = true;
				}
				this.cardCreator(project);
			}
		}

	}

	setPlayingCardHandler(projectId) {
		for (let card of this.cards) {
			if (card.engine.isPlaying && card.project.id != projectId) {
				card.engine.stop();
			}
		}
	}

	getProjects() {
		return ProjectRepository.getProjects()
			.then((data) => {
				let promises = []
				for (let project of data) {
					promises.push(ProjectRepository.getBeatmap(project.id).then((beatmap) => {
						project.beatmap = beatmap;

					}));
				}
				this.data = data;
				this.displayData = data;
				this.render();
				return Promise.all(promises);
			});
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
			this.getProjectsAndTracks();
		});
	}

	filterProjects(filter) {
		this.displayData = this.data.filter((item) => {
			if (item.name.toLowerCase().indexOf(filter.name.toLowerCase()) === -1) {
				return false;
			}
			if (item.genre.name.toLowerCase().indexOf(filter.genreName.toLowerCase()) === -1) {
				return false;
			}
			return true;
		});

		this.domElement.querySelector(".cards").innerHTML = "";

		this.allCards(this.displayData);
	}


	render() {

		this.domElement.innerHTML = `<div class="searches"></div><div class="modals"></div><div class="cards"></div>`;

		this.searchTitle = new Search(this.domElement.querySelector(".searches"), "Name");
		this.searchTitle.render();
		this.searchTitle.domElement.querySelector(".search-input").addEventListener("keyup", () => {

			this.filter.name = this.searchTitle.domElement.querySelector(".search-input").value;
			this.filter.genreName = this.searchGenre.domElement.querySelector(".search-input").value;
			this.filterProjects(this.filter);

		})

		this.searchGenre = new Search(this.domElement.querySelector(".searches"), "Genre");
		this.searchGenre.render();
		this.searchGenre.domElement.querySelector(".search-input").addEventListener("keyup", () => {

			this.filter.name = this.searchTitle.domElement.querySelector(".search-input").value;
			this.filter.genreName = this.searchGenre.domElement.querySelector(".search-input").value;

			this.filterProjects(this.filter);
		})

		this.allCards(this.data);

	}
}

export default Projects;