import Component from "../../components/Component";
import SoundRepository from "../../repositories/SoundRepository";
import Router from "../../services/router/Router";
import Button from "../../components/button/Button";
import "./Sound.scss";

class Sound extends Component {
    constructor(container, soundId = null) {
        super(container, "add-sound");
        this.soundId = soundId;

        this.getSoundsTypesHTML();
    }

    handleSoundsPage() {
        Router.goToUrl('/sounds');
    }

    getSoundsById() {
        SoundRepository.getSoundById((data) => {
            document.querySelector('#name').value = data.name;
            document.querySelector('#type').value = data.type.id;
        }, this.soundId);
    }

    getSoundsTypesHTML() {
        this.typesElement = `<option value="">Options</option>`;
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

    getFormData() {
        const form = {
            name: document.querySelector('#name').value,
            type: document.querySelector('#type').value,
        }
        return form;
    }

    createNewSound(form) {
        if (this.verifyFormData()) {
            SoundRepository.sendData(form);
            this.handleSoundsPage();
        }
    }

    editSoundById(form, id) {
        if (this.verifyFormData()) {
            SoundRepository.editSoundById(form, id);
            this.handleSoundsPage();
        }
    }

    verifyFormData() {
        const form = this.getFormData();
        const nameWarning = document.querySelectorAll('.hidden')[0];
        const typeWarning = document.querySelectorAll('.hidden')[1];
        const nameInput = document.querySelector("#name");
        const typeInput = document.querySelector("#type");
        let validation = true;

        document.querySelector('.hidden-text').classList.remove('none');
        
        function handleErrorClassesChange(input, warning, tagId) {
            document.querySelector(`${tagId}`).classList.add('wrong-input');
            warning.className = 'block red hidden';
            input.addEventListener("change", () => {
                warning.className = 'hidden required red';
                input.className = '';
            })
            validation = false;
        }

        if (!form.name.trim()) {
            handleErrorClassesChange(nameInput, nameWarning, "#name");
        } else {
            document.querySelector('#name').classList.remove('wrong-input');
            nameWarning.classList.add('required');
        }

        if (type.value == '') {
            handleErrorClassesChange(typeInput, typeWarning, "#type");
        } else {
            document.querySelector('#type').classList.remove('wrong-input');
            typeWarning.classList.add('required');
        }

        if (validation == true) {
            document.querySelector('.hidden-text').classList.add('none');
        }

        return validation;
    }

    render() {
        this.domElement.innerHTML = `
            <div class="sound-label">
                <div class="sound-form">
                    <div class="form-row">
                        <div class="text-part">
                            <label for="name">Name:<span class="red">*</span></label>
                            <label for="type">Type:<span class="red">*</span></label>
                            <label>Upload Sound:<span class="red">*</span></label>
                        </div>
                        <div class="input-part">
                            <input type="text" id="name" placeholder="Name"></input>
                            <select type="type" id="type" required=""></select>
                            <i class="fas fa-cloud-upload-alt fa-1x cursor-pointer" style="color: gray; float: right;"></i>
                        </div>
                        <div class="none hidden-text">
                            <div class="hidden required red">Required</div>
                            <div class="hidden required red">Required</div>
                        </div>
                    </div>
                </div>
                <div class="form-buttons margin-top">
                    <button class="confirm-button cursor-pointer" id="submit">Confirm</button>
                </div>
            </div>
            `;

        if (this.soundId) {
            this.getSoundsById();
            this.domElement.querySelector('#submit')
                .addEventListener("click", () => this.editSoundById(this.getFormData(), this.soundId));
        } else {
            this.domElement.querySelector('#submit')
                .addEventListener("click", () => this.createNewSound(this.getFormData()));
        }

        this.cancelButton = new Button(this.domElement.querySelector(".form-buttons"), "CANCEL", "cancel-button cursor-pointer", () => {
            this.handleSoundsPage();
        });
        this.cancelButton.render();
    }
}

export default Sound;