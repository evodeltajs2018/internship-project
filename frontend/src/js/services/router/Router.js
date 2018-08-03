import Projects from "../../views/projects/Projects";
import Dummy from "../../views/dummy/Dummy";
import NotFound from "../../views/notfound/NotFound";
import Sound from "../../views/sound/Sound";

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
                component: Dummy
            },
            {
                path: "/404",
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
            Router.goToUrl("/404", { data: "404" });
        }
    }

    static goToUrl(url, data = {}) {
        window.history.pushState(data, "", url);
        window.dispatchEvent(new Event("popstate"));
    }

    static getHistoryState() {
        return window.history.state;
    }

}

export default Router;