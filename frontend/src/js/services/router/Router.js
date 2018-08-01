class Router {
    constructor(container) {
        this.container = container;

        this.routes = [
            {
                path: "/",
                component: Dashboard
            },
            {
                path: "/sounds",
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
            console.error("invalid route");

            const notFound = this.findRouteByUrl("/404");
            this.setNewCurrentComponent(notFound);
            Router.goToUrl("/404", { data: "404" });
        }
    }

    static goToUrl(url, data = {}) {
        window.history.pushState(data, "", url);
        window.dispatchEvent(new Event("popstate"));
    }

    getHistoryState() {
        return window.history.state;
    }

}