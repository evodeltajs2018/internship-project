class Dashboard extends Component {
	constructor(container) {
		super(container, "dashboard");

		this.dashboardRepo = new DashboardRepository();
		this.data = null;

		this.getData();
	}

	getData() {
		this.dashboardRepo.getData((data) => {
			this.data = data;
			this.render();
		});
	}

	render() {
		this.domElement.innerHTML = `
			<h1>dashboard</h1>

			<pre>${JSON.stringify(this.data, null, 4)}</pre>

			<div class="buttons">
			</div>
		`;

		this.refreshButton = new Button(
			this.domElement.querySelector(".buttons"));

		this.refreshButton.text = "Refresh";
		this.refreshButton.onClick = () => {
			this.getData();
			Router.goToUrl("/abc");
		};

		this.refreshButton.render();
	}
}
