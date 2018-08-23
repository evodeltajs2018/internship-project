class TitleService {
    static setCurrentTitle() {
        let pageTitle = document.querySelector(".page-title h2"); 
        let url = window.location.pathname.toString();
        let parseUrl = url.split("/");
        TitleService.addSplicerRoute();
        
        switch (window.location.pathname) {
            case "/":
                pageTitle.innerHTML = "Projects";
                break;
            case "/profile":
                pageTitle.innerHTML = "Profile";
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
            default:
                pageTitle.innerHTML = "Not Found";
                break;

        }
    }
 
    static addSplicerRoute() {
        let pageTitle = document.querySelector(".page-title h2"); 
        document.addEventListener("headerdetails", (event) => {
            let project = event.detail;
            pageTitle.innerHTML = `
                ${project.name}
                <div class="project-description">${project.description}</div>
            `;
        });
    }
}
export default TitleService;