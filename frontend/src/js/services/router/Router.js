import Projects from "../../views/projects/Projects";
import SoundsGrid from "../../views/soundsgrid/SoundsGrid";
import TypesGrid from "../../views/typesgrid/TypesGrid";
import NotFound from "../../views/notfound/NotFound";
import Dummy from "../../views/dummy/Dummy";
import Navigator from "./Navigator";
import Sound from "../../views/sound/Sound";
import Project from "../../views/project/Project";
import Splicer from "../../views/splicer/Splicer";
import SidebarService from "../../services/sidebar_service/SidebarService";
import TitleService from "../../services/title_service/TitleService";
import SoundType from "../../views/type/SoundType";


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
            path: "/types",
            component: TypesGrid
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
        },
        {
            path: "/splicer",
            component: Splicer
        },
        {
            path: "/type",
            component: SoundType
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
                SidebarService.setActiveIcon(urlPath);
                TitleService.setCurrentTitle();

            } else {
                urlPath = url.substring(0, url.length - parameter.length - 1);
                SidebarService.setActiveIcon(urlPath);
                TitleService.setCurrentTitle();
                parameter = match[1];
            }
        } else {
            urlPath = url;
            SidebarService.setActiveIcon(urlPath);
            TitleService.setCurrentTitle();
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
            Navigator.goToUrl("/notfound")
        }
    }
}

export default Router;