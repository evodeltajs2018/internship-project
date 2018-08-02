class Project extends Component {
    constructor(container, projectId = 0) {
        super(container, "project");

        this.projectId = projectId;
        this.projectName = "";
        this.selectedGenre = 0;
        this.genres = null;
        this.description = "";

        this.dashboardRepo = new DashboardRepository();
        this.getGenres();

        if (projectId != 0) {
            this.getProject(projectId);
        }
    }

    getGenres() {
        this.dashboardRepo.getGenres((genres) => {
            this.genres = genres;
            this.render();
        });
    }

    getProject(projectId) {
        this.dashboardRepo.getProject((project) => {

            this.projectName = project["Name"];
            this.description = project["Description"];
            this.selectedGenre = project["Genre"];


            this.render();
        }, projectId);
    }

    createGenresOptions(genres) {
        var genreOptions = `<option value="0">Select...</option>`;

        for (var key in genres) {
            genreOptions += `<option value="` + key + `">` + genres[key] + "</option>";
        }

        return genreOptions;
    }

    selectGenre() {
        document.getElementById("genre").value = this.selectedGenre;
    }

    renderConfirmButton() {
        this.confirmButton = new Button(
            this.domElement.querySelector(".form-button"));

        this.confirmButton.text = "Confirm";
        this.confirmButton.onClick = () => {
            this.getData();
        };

        this.confirmButton.render();
    }

    render() {
        this.domElement.innerHTML = `
            <form action="/do_something">
                <p hidden value="${this.projectId}"></p>
                <div class="field">
                    <div class="item left">
                        Project Name<span class="red">*</span> :
                    </div>
                    <div class="item">
                        <input type="text" name="projectName" value="${this.projectName}" class="width300">
                    </div>
                </div>
                <div class="field">
                    <div class="item left">
                        Genre<span class="red">*</span> :
                    </div>
                    <div class="item">
                        <select class="width300" id="genre" name="projectGenre">
                        ${this.createGenresOptions(this.genres)}
                        </select></div>
                    </div>
                <div class="field">
                    <div class="item left">
                        Description :
                    </div>
                    <div class="item">
                        <textarea name="projectDescription" rows="10" cols="30" class="width300">${this.description}</textarea>
                    </div>
                </div>
                <div class="field">
                    <div class="item left">
                        <input type="submit" value="Confirm" class="form-button">
                    </div>
                    <div class="item right">
                        <a href="javascript:history.back()">Cancel</a>
                    </div>
                </div>
            </form>
        `;

        this.selectGenre();

        this.renderConfirmButton();
    }
}



