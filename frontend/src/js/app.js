class App extends Component {
	constructor(container) {
        super(container, "app");
        
        this.sidebarLinksHTML = '';
        this.sidebarLinks = [
            {
                name: 'Projects',
                icon: 'fas fa-folder'
            },
            {
                name: 'Sounds',
                icon: 'fab fa-soundcloud'
            }
        ]

        this.sidebarLinks.forEach(element => {
            this.sidebarLinksHTML += `
            <li>
                <i class="${element.icon} fa-3x" style="color: gray" value="${element.name}"></i>
            </li>
            <li>${element.name}</li>
            `
        });
	}

	toggleMenu() {
		document.querySelector('.sidebar').classList.toggle('hide-sidebar');
		//document.querySelector('.main').classList.toggle('main-width');
	}

    
	mainPage() {
        App.titleChange(this.getAttribute("value"));
		Router.goToUrl("/");
	}
    
	soundsPage() {
        App.titleChange(this.getAttribute("value"));
		Router.goToUrl("/abc");
	}
    
    static titleChange(title) {
        document.querySelector('.page-title').innerHTML = `
            <h2>${title}</h2>
        `;
    }

	render() {
        this.domElement.innerHTML = `
        <nav class="header">
        <i class="fas fa-bars hamburger"></i>
        <h1>BeatMaker</h1>
        <img src="/src/img/logo.png" class="logo">
        </nav>
        <hr>
        <div class="page-title">
        <h2>Projects</h2>
        </div>
        <div class="split">
        <div class="sidebar">
        <div class="vertical-line"></div>
        <ul class="sidebar-content">
        </ul>
				</div>
				<div class="main"></div>
			</div>
        `;
        

        console.log(this.domElement.querySelector('.sidebar-content'));
        
        this.domElement.querySelector('.sidebar-content')
            .innerHTML = this.sidebarLinksHTML;

		this.domElement.querySelector('.hamburger')
			.addEventListener("click", this.toggleMenu);

		this.domElement.querySelector('.fa-folder')
			.addEventListener("click", this.mainPage);

		this.domElement.querySelector('.fa-soundcloud')
			.addEventListener("click", this.soundsPage);

		this.domElement.querySelector('.logo')
            .addEventListener("click", this.mainPage);
            
        this.router = new Router(document.querySelector('.main'));
	}
}

const app = new App(document.body);
app.render();