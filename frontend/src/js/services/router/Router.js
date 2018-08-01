class Router {
    constructor(container) {
        this.container = container;
        this.notFoundRoute = {
            path: "/404",
            component: NotFound
        };

        this.routes = [
            {
                path: "/",
                component: Dashboard,
                data: {
                    title: "Projects"
                }
            },
            {
                path: "/abc",
                component: Dummy,
                data: {
                    title: "Sounds"
                }
            }
        ];

        const initialPath = window.location.pathname;
        this.renderByUrl(initialPath);

        window.onpopstate = (event) => {
            console.log(window.location.pathname);
            this.renderByUrl(window.location.pathname);
        };
    }

    setNewCurrentComponent(component) {
        if (this.currentComponent) {
            this.currentComponent.unrender();
        }
        //console.log(component);
        this.currentComponent = new component.component(this.container);
        this.currentComponent.render();
    }

    checkNotFound() {
        //console.log(window.location.pathname);
        return window.location.pathname === "/404";
    }

    renderByUrl(url) {
        const component = this.routes.find((route) => { return route.path === url });

        if (component) {
            this.setNewCurrentComponent(component);
        } else {
            console.log("invalid route");
            this.setNewCurrentComponent(this.notFoundRoute);
            Router.goToUrl("/404", { data: "404" });
        }

    }

    static goToUrl(url, data = {}) {
        // if (data) console.log(data);
        window.history.pushState(data, "", url);
        window.dispatchEvent(new Event("popstate"));
    }

    static goBack() {
        window.history.back(1);
        window.dispatchEvent(new Event("popstate"));
    }

}