import Component from "../../components/Component";
import ProjectRepository from "../../repositories/ProjectRepository";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import Router from "../../services/router/Router";
import "./Project.scss";

class Project extends Component {
    constructor(container, projectId = null) {
        super(container, "project");

        this.projectId = projectId;
        this.projectName = "";
        this.selectedGenre = 0;
        this.genres = null;
        this.description = "";

        this.ProjectRepository = new ProjectRepository();
        this.getGenres();

        if (projectId != null) {
            this.getProject(projectId);
        }
    }

    getGenres() {
        this.ProjectRepository.getGenres((genres) => {
            this.genres = genres;
            this.render();
        });
    }

    getProject(projectId) {
        this.ProjectRepository.getProject((project) => {

            this.projectName = project["Name"];
            this.description = project["Description"];
            this.selectedGenre = project["Genre"];

            this.render();
        }, 
        projectId);
    }

    createGenresOptions(genres) {
        var genreOptions = `<option value="0">Select...</option>`;

        const data = JSON.parse(JSON.stringify(genres));

        if (data) {
            var gen = data["genres"];

            for (let key in gen) {
                genreOptions += `<option value="` + gen[key].id + `">` + gen[key].name + "</option>";
            }
        }

        return genreOptions;
    }

    selectGenre() {
        let selectedId = ((typeof this.selectedGenre.id === "undefined") ? 0 : this.selectedGenre.id);

        document.getElementById("genre").value = selectedId;
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
        <div class="container-view">
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
        </div>
        `;

        this.selectGenre();

        this.renderConfirmButton();
    }
}

export default Project;