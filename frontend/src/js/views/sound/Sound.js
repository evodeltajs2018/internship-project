import Component from "../../components/Component";
import SoundRepository from "../../repositories/SoundRepository";
import Navigator from "../../services/router/Navigator";
import Button from "../../components/button/Button";
import "./Sound.scss";

class Sound extends Component {
    constructor(container, soundId = null, uploadClicked = false) {
        super(container, "add-sound");
        this.soundId = soundId;
        this.buffer = null;
        this.uploadClicked = uploadClicked;

        this.getSoundsTypesHTML();
    }

    getSoundsById() {
        return SoundRepository.getSoundById((data) => {
            document.querySelector('#name').value = data.name;
            document.querySelector('#type').value = data.type.id;
        }, this.soundId);
    }

    getSoundsTypesHTML() {
        this.typesElement = `<option value="">Options</option>`;
        SoundRepository.getSoundTypes((data) => {
            this.data = data;
            for (let i = 0; i < this.data.length; i++) {
                this.typesElement += `
                    <option value="${this.data[i].id}">${this.data[i].name}</option>
                `
            }
            document.querySelector("#type").innerHTML = this.typesElement;
        });
    }

    getFormData() {
        const form = {
            name: document.querySelector('#name').value,
            type: document.querySelector('#type').value,
            value: this.arraybuffer
        }
        return form;
    }

    createNewSound(form) {
        if (this.verifyFormData()) {
            SoundRepository.sendData(form);
        }
    }

    editSoundById(form, id) {
        if (this.verifyFormData()) {
            SoundRepository.editSoundById(form, id);
        }
    }

    verifyFormData() {
        const form = this.getFormData();
        const nameWarning = document.querySelectorAll('.hidden')[0];
        const typeWarning = document.querySelectorAll('.hidden')[1];
        const soundWarning = document.querySelectorAll('.hidden')[2];
        const nameInput = document.querySelector("#name");
        const typeInput = document.querySelector("#type");
        const soundInput = document.querySelector("#upload");
        const uploadFile = document.querySelector("#file");
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

        if (uploadFile.files[0] == undefined) {
            document.querySelector("#upload").classList.add('wrong-input');
            soundWarning.className = 'block red hidden';
            uploadFile.addEventListener('change', () => {
                soundWarning.className = 'hidden required red';
                soundInput.className = 'fas fa-cloud-upload-alt cursor-pointer';
            })
            validation = false;
        } else {
            document.querySelector('#upload').classList.remove('wrong-input');
            soundWarning.classList.add('required');
        }

        return validation;
    }

    generateByteArray() {
        const input = this.domElement.querySelector("#file");
        const reader = new FileReader();

        reader.onload = () => {
            if (!this.uploadClicked) {
                this.createPlayButton();
            }
                document.querySelector('#name').value = input.files[0].name;
                this.buffer = reader.result;
                this.uploadClicked = true;
                this.arraybuffer = input.files[0];
        }

        reader.readAsArrayBuffer(input.files[0]);
    }

    copyBuffer(src)  {
        const dst = new ArrayBuffer(src.byteLength);
        new Uint8Array(dst).set(new Uint8Array(src));
        return dst;
    }

    playSound() {
        const context = new AudioContext();
        const buffer = this.copyBuffer(this.buffer);
        context.decodeAudioData(buffer).then((data) => {
            const source = context.createBufferSource();
            
            source.buffer = data;
            source.connect(context.destination);
            source.start(0);
        })
    }

    getSound() {
        return SoundRepository.getSoundDataById(this.soundId).then(res => this.buffer = res);
    }

    createPlayButton() {
        this.domElement.querySelector('.upload-play').insertAdjacentHTML('beforeend', `
            <i class="fas fa-play-circle" id="play-sound"></i>
            `);
        this.domElement.querySelector('#play-sound')
            .addEventListener("click", () => this.playSound());
    }

    handleEditSound() {
        this.getSoundsById();
        this.getSound()
        .then(() => {
            this.uploadClicked = true;
            this.createPlayButton();
            this.domElement.querySelector('#submit')
            .addEventListener("click", () => this.editSoundById(this.getFormData(), this.soundId));
        })
    }

    handleAddSound() {
        this.domElement.querySelector('#submit')
            .addEventListener("click", () => this.createNewSound(this.getFormData()));
    }

    render() {
        this.domElement.innerHTML = `
            <div class="sound-label">
                <div class="sound-form">
                    <div class="form-row">
                        <div class="text-part">
                            <label class='margin-top-menu' for="name">Name:<span class="red">*</span></label>
                            <label class='margin-top-menu' for="type">Type:<span class="red">*</span></label>
                            <label class='margin-top-menu'>Upload Sound:<span class="red">*</span></label>
                        </div>
                        <div class="input-part">
                            <input class='margin-top-menu' type="text" id="name" placeholder="Name"></input>
                            <select class='margin-top-menu' type="type" id="type" required=""></select>
                            <input type="file" name="file" id="file" class="inputfile" accept="audio/mp3,audio/wav"/>
                            <div class='upload-play margin-top-menu' '>
                                <label for="file" id='upload'>
                                    <i class="fas fa-cloud-upload-alt cursor-pointer" id="upload" style="width: 50%"></i>
                                </label>
                            </div>
                        </div>
                        <div class="none hidden-text">
                            <div class="hidden required red">Required</div>
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
            this.handleEditSound();
        } else {
            this.handleAddSound();
        }

        this.domElement.querySelector("#file")
            .addEventListener("change", () => this.generateByteArray());

        this.cancelButton = new Button(this.domElement.querySelector(".form-buttons"), "CANCEL", "cancel-button cursor-pointer", () => {
            Navigator.goToUrl("/sounds");
        });
        this.cancelButton.render();
    }
}

export default Sound;