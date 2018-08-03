import Component from "../../components/Component";
import SoundRepository from "../../repositories/SoundRepository";
import Router from "../../services/router/Router";
import Button from "../../components/button/Button";
import "./Sound.scss";

class Sound extends Component {
    constructor(container) {
        super(container, "add-sound");
        this.router = new Router();

        this.getSoundsTypesHTML();
    }

    getSoundsTypesHTML() {
        this.typesElement = ``;
		SoundRepository.getSoundTypes((data) => {
            this.data = data;
            for (let i = 0; i < this.data[0].length; i++) {
                this.typesElement += `
                    <option value="${this.data[0][i].id}">${this.data[0][i].name}</option>
                `
            }
            document.querySelector("#type").innerHTML = this.typesElement;
		});
    }

    handleSoundsPage() {
        Router.goToUrl('/sounds');
    }

    getFormData() {
        const form = {
            name: document.querySelector('#name').value,
            type: document.querySelector('#type').value,
        }
        return form;
    }

    createNewSound(form) {
        SoundRepository.sendData(form);
        this.handleSoundsPage();
    }

    render() {
        this.domElement.innerHTML = `
            <div class="sound-form">
                <div>
                    <label for="name">Name:*</label>
                    <input type="text" id="name"></input>
                </div>
                <div>
                    <label for="type">Type:*</label>
                    <select type="type" id="type">
                    </select>
                </div>
                <div>
                Upload Sound:* <i class="fas fa-cloud-upload-alt fa-1x" style="color: gray"></i>
                </div>
                <button class="confirmButton" id="submit"}>Confirm</button>
            </div>
            `;

        this.domElement.querySelector('#submit')
            .addEventListener("click", () => this.createNewSound(this.getFormData()));

        this.cancelButton = new Button(this.domElement.querySelector(".sound-form"), "CANCEL", "cancelButton", () => {
            this.handleSoundsPage();
        });
        this.cancelButton.render();
    }
}

export default Sound;