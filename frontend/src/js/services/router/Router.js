class Router {
    constructor(container) {
        this.container = container;
        this.notFoundRoute = {
            path: "/404",
            data: NotFound
        };

        this.routes = [
            {
                path: "/",
                data: Dashboard
            },
            {
                path: "/abc",
                data: Dummy
            }
        ];
        
        const initialPath = window.location.pathname;
        this.renderByUrl(initialPath);
        console.log(initialPath);
        window.onpopstate = (event) => {
            console.log(window.location.pathname);
            this.renderByUrl(window.location.pathname);
        };
    }

    setNewCurrentComponent(component) {
        if (this.currentComponent) {
            this.currentComponent.unrender();
        }
        this.currentComponent = new component.data(this.container);
        this.currentComponent.render();
    }

    checkNotFound() {
        return this.currentComponent instanceof NotFound;
    }

    renderByUrl(url) {
        const component = this.routes.find((route) => { return route.path === url });

        if (component) {
            this.setNewCurrentComponent(component);
        } else {
            console.log("invalid route");
            this.setNewCurrentComponent(this.notFoundRoute);
            Router.goToUrl("/404");
        }
        
    }

    static goToUrl(url) {
        window.history.pushState({}, "", url);
        window.dispatchEvent(new Event("popstate"));
    }

    static goBack() {
        window.history.back(1);
        window.dispatchEvent(new Event("popstate"));
    }

}