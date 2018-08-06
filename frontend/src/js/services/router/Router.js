import Projects from "../../views/projects/Projects";
import SoundsGrid from "../../views/soundsgrid/SoundsGrid";
import NotFound from "../../views/notfound/NotFound";
import Dummy from "../../views/dummy/Dummy";
import Navigator from "./Navigator";

class Router {
    constructor(container) {
        this.container = container;

        this.routes = [
            {
                path: "/",
                component: Projects,
            },
            {
                path: "/sounds",
                component: SoundsGrid
            },
            {
                path:"/newproject",
                component: Dummy
            },
            {
                path: "/404",
                component: NotFound
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

    setNewCurrentComponent(component) {
        if (this.currentComponent) {
            this.currentComponent.unrender();
        }

        this.currentComponent = new component.component(this.container);
        this.currentComponent.render();
    }

    findRouteByUrl(url) {
        return this.routes.find((route) => { return route.path === url });
    }

    renderByUrl(url) {
        const component = this.findRouteByUrl(url);

        if (component) {
            this.setNewCurrentComponent(component);
        } else {
            console.error("invalid path");

            const notFound = this.findRouteByUrl("/404");
            this.setNewCurrentComponent(notFound);
            Navigator.goToUrl("/404", { data: "404" });
        }
    }
}


export default Router;