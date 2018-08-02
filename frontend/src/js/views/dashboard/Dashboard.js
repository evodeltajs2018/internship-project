class Dashboard extends Component {
	constructor(container) {
		super(container, "dashboard");

		this.dashboardRepo = new DashboardRepository();
		this.data = null;
		this.genres = null;

		this.getData();
		//	this.getProject();
	}

	getData() {
		this.dashboardRepo.getData((data) => {
			this.data = data;
			this.render();
		});
	}

	addProject() {
		this.project = new Project(
			this.domElement.querySelector(".main"), 0);

		this.project.render();
	}

	editProject() {
		let projectId = 1;
		this.project = new Project(
			this.domElement.querySelector(".main"), projectId);

		this.project.render();
	}

	render() {
		this.domElement.innerHTML = `
			<h1>dashboard</h1>

			<pre>${JSON.stringify(this.data, null, 4)}</pre>

			<div class="main">
			</div>

			<div class="buttons">
			</div>
		`;

		//this.addProject();
		this.editProject();

		this.refreshButton = new Button(
			this.domElement.querySelector(".buttons"));

		this.refreshButton.text = "Refresh";
		this.refreshButton.onClick = () => {
			this.getData();
			Router.goToUrl("/sounds");
		};

		this.refreshButton.render();
	}
}
