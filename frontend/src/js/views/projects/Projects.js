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

		let array = JSON.parse(JSON.stringify(this.data));

		for (let x of array.projects){
			this.card=new Card(this.domElement.querySelector(".cards"),x);
			this.card.render();
		}

		this.addingCard = new AddingCard(this.domElement.querySelector(".cards"));
		this.addingCard.render();

		for(let button of document.getElementsByClassName("deleteButton")){
			button.addEventListener("click",() => {
				this.card.deleteButtonHandler();
			});
		}


		this.modal = new Modal(this.domElement.querySelector(".modals"),"Delete Project","Are you sure you want to delete this project?");
		this.modal.render();
		this.modal.closeButtonHandler();
	}
}
