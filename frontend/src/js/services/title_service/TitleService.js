class TitleService {
    static setCurrentTitle() {
        let pageTitle = document.querySelector(".page-title h2"); 
        let url = window.location.pathname.toString();
        let parseUrl = url.split("/");
        console.log(window.history.state);
        switch (window.location.pathname) {
            case "/":
                pageTitle.innerHTML = "Projects";
                break;
            case "/sounds":
                pageTitle.innerHTML = "Sounds";
                break;
            case "/projects":
                pageTitle.innerHTML = "Projects";
                break;
            case "/types":
                pageTitle.innerHTML = "Types";
                break;
            case "/sound":
                pageTitle.innerHTML = "Add New Sound";
                break;
            case "/project":
                pageTitle.innerHTML = "Add New Project";
                break;
            case "/type":
                pageTitle.innerHTML = "Add New Type";
                break;
            case ("/project/" + parseUrl[parseUrl.length - 1]):
                pageTitle.innerHTML = "Edit Project";
                break;
            case ("/sound/" + parseUrl[parseUrl.length - 1]):
                pageTitle.innerHTML = "Edit Sound";
                break;
            case ("/type/" + parseUrl[parseUrl.length - 1]):
                pageTitle.innerHTML = "Edit Type";
                break;
            case "/splicer":
                pageTitle.innerHTML = "Splicer";
                break;
            case ("/splicer/" + parseUrl[parseUrl.length - 1]):
                pageTitle.innerHTML = `
                    ${window.history.state.name}
                    <div class="project-description">${window.history.state.description}</div>
                `;
                break;
            default:
                pageTitle.innerHTML = "Not Found";
                break;

        }
    }
}
export default TitleService;