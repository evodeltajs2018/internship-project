import Component from "./components/Component";
import MenuService from "./services/MenuService";
import Navigator from "./services/router/Navigator";
import Router from "./services/router/Router";
import TokenService from "./services/auth/TokenService";
import User from "./components/user/User";
import "./App.scss";

const sidebarHidingWidth = 900;

class App extends Component {
    constructor(container) {
        super(container, "app");
        this.router = new Router();
        this.menuService = new MenuService();
        this.sidebarLinks = this.menuService.getSidebarLinks();
        
        window.addEventListener("resize", () => {
            this.hideSidebarBySize();
        });
    }

    hideSidebarBySize() {
        if (window.innerWidth < sidebarHidingWidth && !document.querySelector(".hide-sidebar")) {
            this.toggleMenu();
        } else if (window.innerWidth >= sidebarHidingWidth && document.querySelector(".hide-sidebar")) {
            this.toggleMenu();
        }
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
                <div class="menu-element" value="${element.name}">
                    <i class="${element.icon} fa-2x"></i>
                <div>
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
        for (let i = 0; i < element.length; i++) {
            element[i].addEventListener("click", (e) => { this.loadPage(e.currentTarget); });
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
            <h1>Splicer</h1>
            <div class="user-card"></div>
        </nav>
        <div class="split">
            <div class="sidebar">
                <ul class="sidebar-content"></ul>
            </div>
            <div class="right-side">
                <div class="page-title">
                    <h2>Projects</h2>
                </div>
                <div class="main"></div>
                <div class="footer">💻 with ❤️ in Cluj-Napoca, RO.</div>
            </div>
        </div>
        `;


        this.domElement.querySelector('.sidebar-content')
            .innerHTML = this.getSidebarLinksHTML();

        this.domElement.querySelector('.hamburger')
            .addEventListener("click", this.toggleMenu);

        this.addClickEventListenerToSidebar();
        this.initRouter();
        this.hideSidebarBySize();
    }
}

const app = new App(document.body);
app.render();