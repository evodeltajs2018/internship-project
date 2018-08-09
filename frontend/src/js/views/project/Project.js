import Component from "../../components/Component";
import ProjectRepository from "../../repositories/ProjectRepository";
import GenreRepository from "../../repositories/GenreRepository";
import Button from "../../components/button/Button";
import Navigator from "../../services/router/Navigator";
import "./Project.scss";

class Project extends Component {
    constructor(container, projectId = null) {
        super(container, "project");

        this.projectId = projectId;
        this.projectName = "";
        this.selectedGenre = 0;
        this.genres = null;
        this.description = "";

        this.getGenresHTML();

        if (projectId != null) {
            this.getProject(projectId);
        }
    }

    getGenresHTML() {
        this.typesElement = `<option value=""></option>`;
        GenreRepository.getGenres((data) => {
            this.data = data;

            for (let i = 0; i < this.data.length; i++) {
                this.typesElement += `
                    <option value="${this.data[i].id}">${this.data[i].name}</option>
                `
            }
            document.querySelector("#genre").innerHTML = this.typesElement;
        });
    }

    getProject(projectId) {
        ProjectRepository.getProjectById((data) => {
            if (data.length > 0) {
                document.querySelector('#name').value = data[0].name;
                document.querySelector('#genre').value = data[0].genre.id;
                document.querySelector('#description').value = data[0].description;
            }
            else{
                Navigator.goToUrl("/projects");
            }
        }, projectId);
    }

    getFormData() {
        const form = {
            id: this.projectId,
            name: this.domElement.querySelector('#name').value,
            genre: {
                id: this.domElement.querySelector('#genre').value,
            },
            description: this.domElement.querySelector('#description').value,
        }

        return form;
    }

    createProject(form) {
        //  if (this.verifyFormData()) {
        ProjectRepository.createProject(form);
        //  }
    }

    editProjectById(form, id) {
        //  if (this.verifyFormData()) {
        ProjectRepository.editProjectById(form, id);
        //  }
    }

    createConfirmButton() {
        this.confirmButton = new Button(this.domElement.querySelectorAll(".field")[3], "Confirm", "confirm-button cursor-pointer", () => {
            Navigator.goToUrl("/projects");
        });
        this.confirmButton.render();

        if (this.projectId) {
             this.domElement.querySelector('.confirm-button')
               .addEventListener("click", () => this.editProjectById(this.getFormData(), this.projectId));
        } else {
            this.domElement.querySelector('.confirm-button')
                .addEventListener("click", () => this.createProject(this.getFormData()));
        }
    }

    createCancelButton(){
        this.cancelButton = new Button(this.domElement.querySelectorAll(".field")[3], "CANCEL", "cancel-button cursor-pointer", () => {
            Navigator.goToUrl("/projects");
        });
    }

    render() {
        this.domElement.innerHTML = `
        <div class="container-view">
            <div>
                <div class="field">
                    <div class="item left">
                        Project Name<span class="red">*</span> :
                    </div>
                    <div class="item">
                        <input type="text" id="name" name="projectName" value="${this.projectName}" class="width300">
                    </div>
                </div>
                <div class="field">
                    <div class="item left">
                        Genre<span class="red">*</span> :
                    </div>
                    <div class="item">
                        <select class="width300" id="genre" name="projectGenre">
                        </select></div>
                    </div>
                <div class="field">
                    <div class="item left">
                        Description :
                    </div>
                    <div class="item">
                        <textarea id="description" name="projectDescription" rows="10" cols="30" class="width300"></textarea>
                    </div>
                </div>
                <div class="field">
                </div>
            </div>
        </div>
        `;

        this.createConfirmButton();
        this.createCancelButton();
     
        this.cancelButton.render();
    }
}

export default Project;