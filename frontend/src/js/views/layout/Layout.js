class Layout extends Component {
	constructor(container) {
		super(container, "layout");
	
	}

	toggleMenu() {
		document.querySelector('.sidebar').classList.toggle('hide-sidebar');
		document.querySelector('.main').classList.toggle('main-width');
	}

	titleChange(title) {
		document.querySelector('.page-title').innerHTML = `
			<h2>${title}</h2>
		`;
	}

	mainPage(titleChangeFunction) {
		titleChangeFunction('Projects');
		document.querySelector('.main').innerHTML = ``;
		const dashboard = new Dashboard(document.querySelector('.main'));
		dashboard.render();
	}

	soundsPage(titleChangeFunction) {
		titleChangeFunction('Sounds');
		console.log('Sounds page');
	}

	render() {
		this.domElement.innerHTML = `
			<nav class="header">
				<i class="fas fa-bars hamburger"></i>
				<h1>BeatMaker</h1>
				<img src="src/img/logo.png" class="logo">
			</nav>
            <hr>
            <div class="page-title">
                <h2>Projects</h2>
			</div>
			<div class="split">
				<div class="sidebar">
					<div class="vertical-line"></div>
					<ul class="sidebar-content">
						<li>
							<i class="fas fa-folder fa-3x" style="color: gray"></i>
						</li>
						<li>Projects</li>
						<li>
							<i class="fab fa-soundcloud fa-3x" style="color: gray"></i></li>
						<li>Sounds</li>
					</ul>
				</div>
				<div class="main"></div>
			</div>
		`;

		this.domElement.querySelector('.hamburger')
			.addEventListener("click", this.toggleMenu);

		this.domElement.querySelector('.fa-folder')
			.addEventListener("click", () => {this.mainPage(this.titleChange)});

		this.domElement.querySelector('.fa-soundcloud')
			.addEventListener("click", () => {this.soundsPage(this.titleChange)});

		this.domElement.querySelector('.logo')
			.addEventListener("click", () => {this.mainPage(this.titleChange)});	
	}
}