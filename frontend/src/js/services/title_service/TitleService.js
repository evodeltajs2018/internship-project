class TitleService {
    static setCurrentTitle() {
        let pageTitle = document.querySelector(".page-title h2");

        let url = window.location.pathname.toString();
        let parseUrl = url.split("/");

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
            case "/sound":
                pageTitle.innerHTML = "Add New Sound";
                break;
            case "/project":
                pageTitle.innerHTML = "Add New Project";
                break;
            case ("/project/" + parseUrl[parseUrl.length - 1]):
                pageTitle.innerHTML = "Edit Project " + parseUrl[parseUrl.length - 1];
                break;
            case ("/sound/" + parseUrl[parseUrl.length - 1]):
                pageTitle.innerHTML = "Edit Sound " + parseUrl[parseUrl.length - 1];
                break;
            default:
                pageTitle.innerHTML = "Not Found";
                break;

        }
    }
}
export default TitleService;