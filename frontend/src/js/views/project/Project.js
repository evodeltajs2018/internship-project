import Component from "../../components/Component";
import ProjectRepository from "../../repositories/ProjectRepository";
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
        this.typesElement = `<option value="">Options</option>`;
        ProjectRepository.getGenres((data) => {
            this.data = data;
            for (let i = 0; i < this.data[0].length; i++) {
                this.typesElement += `
                    <option value="${this.data[0][i].id}">${this.data[0][i].name}</option>
                `
            }
            document.querySelector("#genre").innerHTML = this.typesElement;
        });
    }

    getProject(projectId) {
        ProjectRepository.getProjectById((data) => {
            document.querySelector('#name').value = data.name;
            document.querySelector('#genre').value = data.genre.id;
            document.querySelector('#description').value = data.description;

        }, this.projectId);
    }

    getFormData() {
        const form = {
            name: document.querySelector('#name').value,
            genre: document.querySelector('#genre').value,
            description: document.querySelector('#description').value,
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
                    <div class="item left">
                        <div class="form-buttons margin-top">
                            <button class="confirm-button cursor-pointer" id="submit">Confirm</button>
                        </div>
                    </div>
                </div>
                    </div>
                    <div class="item right">
                        <a href="javascript:history.back()">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
        `;

        if (this.projectId) {
           // this.getSoundsById();
            this.domElement.querySelector('#submit')
                .addEventListener("click", () => this.editProjectById(this.getFormData(), this.projectId));
        } else {
            this.domElement.querySelector('#submit')
                .addEventListener("click", () => this.createProject(this.getFormData()));
        }

        this.cancelButton = new Button(this.domElement.querySelector(".form-buttons"), "CANCEL", "cancel-button cursor-pointer", () => {
            Navigator.goToUrl("/projects");
        });
        this.cancelButton.render();

       // this.renderConfirmButton();
    }
}

export default Project;