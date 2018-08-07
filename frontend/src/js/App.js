import Component from "./components/Component";
import MenuService from "./services/MenuService";
import Navigator from "./services/router/Navigator";
import Router from "./services/router/Router";
import "./App.scss";

class App extends Component {
	constructor(container) {
        super(container, "app");
        this.router = new Router();
        this.menuService = new MenuService();
        this.sidebarLinks = this.menuService.getSidebarLinks();
    }

	toggleMenu() {
        document.querySelector('.sidebar').classList.toggle('hide-sidebar');
        document.querySelector('.main').classList.toggle('main-width');

    }

    getRouteFromMenuElement(value) {
        return this.sidebarLinks.find((v) => v.name == value).route;
    }

    loadPage(target) {
        this.handleTitleChange(target.getAttribute("value"));
        Navigator.goToUrl(this.getRouteFromMenuElement(target.getAttribute("value")));
    }

    getSidebarLinksHTML() {
        this.sidebarLinksHTML = '';
        this.sidebarLinks.map(element => {
            this.sidebarLinksHTML += `
            <li>
                <i class="${element.icon} fa-3x menu-element" style="color: gray" value="${element.name}"></i>
            </li>
            <li>${element.name}</li>
            `
        });

        return this.sidebarLinksHTML;
    }

    handleTitleChange(title) {
        document.querySelector('.page-title').innerHTML = `
            <h2>${title}</h2>
        `;
    }

    addClickEventListenerToSidebar() {
        const element = this.domElement.querySelectorAll('.menu-element');

        for(let i = 0; i < element.length; i++) {
            element[i].addEventListener("click", (e) => { this.loadPage(e.target) });
        }
    }

    initRouter() {
        this.router.container = document.querySelector('.main');
        this.router.init();
    }

	render() {
        this.domElement.innerHTML = `
        <nav class="header">
            <i class="fas fa-bars hamburger"></i>
            <h1>BeatMaker</h1>
            <img src="/src/img/logo.png" class="logo menu-element" value="Projects">
        </nav>
        <hr>
        <div class="page-title">
            <h2>Projects</h2>
        </div>
        <div class="split">
            <div class="sidebar">
                <ul class="sidebar-content"></ul>
            </div>
            <div class="main"></div>
        </div>
        `;

        this.domElement.querySelector('.sidebar-content')
        .innerHTML = this.getSidebarLinksHTML();

		this.domElement.querySelector('.hamburger')
        .addEventListener("click", this.toggleMenu);

        this.addClickEventListenerToSidebar();

        this.initRouter();
	}
}

const app = new App(document.body);
app.render();