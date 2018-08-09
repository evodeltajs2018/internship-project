import Projects from "../../views/projects/Projects";
import SoundsGrid from "../../views/soundsgrid/SoundsGrid";
import NotFound from "../../views/notfound/NotFound";
import Dummy from "../../views/dummy/Dummy";
import Navigator from "./Navigator";
import Sound from "../../views/sound/Sound";
import Project from "../../views/project/Project";

class Router {
    constructor(container) {
        this.container = container;

        this.routes = [{
                path: "/",
                component: Projects,
            },
            {
                path: "/projects",
                component: Projects,
            },
            {
                path: "/project",
                component: Project
            },
            {
                path: "/sounds",
                component: SoundsGrid
            },
            {
                path: "/newproject",
                component: Dummy
            },
            {
                path: "/notfound",
                component: NotFound
            },
            {
                path: "/sound",
                component: Sound
            }
        ];
    }

    init() {
        this.renderInitialPath();
        this.addPopStateEvent();
    }

    renderInitialPath() {
        const initialPath = window.location.pathname;
        this.renderByUrl(initialPath);
    }

    addPopStateEvent() {
        // called when URL is changed
        window.onpopstate = (event) => {
            
            this.renderByUrl(window.location.pathname);
        };
    }

    setNewCurrentComponent(route) {
        if (this.currentComponent) {
            this.currentComponent.unrender();
        }

        this.currentComponent = new route.component.component(this.container, route.param);
        this.currentComponent.render();
    }

    static setActiveIcon(url){
        const menuElements = document.querySelectorAll(".menu-element");
        if(url == "/"){
            menuElements[0].style.color = "powderblue";
        }else{
            menuElements[0].style.color = "gray";
        }
        // for (let i=0;i<menuElements.length;i++){
        //     // if (menuElements)
        // }
    }

    findRouteByUrl(url) {
        let parameter = null;
        let urlPath = null;

        let match = url.match(/\/([^\/]+)\/?$/);

        if (match) {
            parameter = match[1];

            if (isNaN(parameter)) {
                urlPath = url;
                parameter = null;
                Router.setActiveIcon(urlPath);

            } else {
                urlPath = url.substring(0, url.length - parameter.length - 1);
                // console.log(urlPath);
                parameter = match[1];
            }
        } else {
            urlPath = url;
            Router.setActiveIcon(urlPath);
        }

        return {
            component: this.routes.find((route) => {
                return route.path === urlPath
            }),
            param: parameter
        };
    }

    renderByUrl(url) {
        const route = this.findRouteByUrl(url);

        if (route.component) {
            this.setNewCurrentComponent(route);
        } else {
            console.error("invalid route");

            const notFound = this.findRouteByUrl("/notfound");
            this.setNewCurrentComponent(notFound);
            Navigator.goToUrl("/notfound", {
                data: "404"
            });
        }
    }
}

export default Router;