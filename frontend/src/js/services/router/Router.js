import Projects from "../../views/projects/Projects";
import Project from "../../views/project/Project";
import Dummy from "../../views/dummy/Dummy";
import NotFound from "../../views/notfound/NotFound";

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
                path: "/project",
                component: Project
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

    setNewCurrentComponent(route) {
        if (this.currentComponent) {
            this.currentComponent.unrender();
        }

        this.currentComponent = new route.component.component(this.container, route.param);
        this.currentComponent.render();
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
            }
            else {
                console.log(url );
                console.log(urlPath );
                urlPath = url.substring(0, url.length - parameter.length - 1);
                parameter = match[1];
              if(urlPath.length == 0){
                urlPath = url; 
              }
            }
        }
        else{
            urlPath = url;
        }

        return {
            component: this.routes.find((route) => { return route.path === urlPath }),
            param: parameter
        };
    }

    renderByUrl(url) {
        const route = this.findRouteByUrl(url);

        if (route.component) {
            this.setNewCurrentComponent(route);
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