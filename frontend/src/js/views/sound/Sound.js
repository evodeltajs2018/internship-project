import Component from "../../components/Component";
import SoundRepository from "../../repositories/SoundRepository";
import SoundTypeRepository from "../../repositories/SoundTypeRepository";
import Navigator from "../../services/router/Navigator";
import Button from "../../components/button/Button";
import "./Sound.scss";

class Sound extends Component {
    constructor(container, soundId = null) {
        super(container, "add-sound");
        this.extension = 'wav';
        this.soundId = soundId;
        this.buffer = null;
        this.source = false;
        this.uploadImageClicked = false;
        this.uploadSoundClicked = false;
        window.addEventListener('popstate', () => this.handlePageLeave());
        
        this.createSoundTypesDropdown();
    }

    handlePageLeave() {
        if (this.source) {
            this.source.stop(0);
            this.source = false;
        }
        window.removeEventListener('popstate', this.handlePageLeave);
    }

    getFormData() {
        const form = {
            name: document.querySelector('#name').value,
            type: document.querySelector('#type').value,
            src: this.imageSrc,
            value: this.arraybuffer
        }
        return form;
    }

    verifyFormData() {
        const data = this.getFormData();
        const soundWarning = document.querySelectorAll('.required')[3];
        const soundInput = document.querySelector("#upload");
        const uploadSound = document.querySelector("#sound");
        let validation = true;

        if (data.name.trim() === '') {
            document.querySelectorAll('.required')[1].classList.remove('visbility-hidden');
            document.querySelector("#name").classList.add('input-red');

            document.querySelector("#name").addEventListener("change", () => {
                document.querySelectorAll('.required')[1].classList.add('visbility-hidden');
                document.querySelector("#name").classList.remove('input-red');
            })
            validation = false;
        }
        if (type.value === '') {
            document.querySelectorAll('.required')[2].classList.remove('visbility-hidden');
            document.querySelector("#type").classList.add('input-red');
            document.querySelector("#type").addEventListener("change", () => {
                document.querySelectorAll('.required')[2].classList.add('visbility-hidden');
                document.querySelector("#type").classList.remove('input-red');
            })
            validation = false;
        }

        if (data.src === undefined) {
            document.querySelectorAll('.required')[0].classList.remove('visbility-hidden')
            document.querySelector('.fa-cloud-upload-alt').classList.add('icon-red');
            validation = false;
        }

        if (uploadSound.files[0] == undefined && this.soundId === null) {
            document.querySelectorAll('.required')[3].classList.remove('visbility-hidden');

            uploadSound.addEventListener('change', () => {
                document.querySelectorAll('.required')[3].classList.add('visbility-hidden');
                soundInput.className = 'fas fa-cloud-upload-alt cursor-pointer';
            })

            validation = false;
        }
        else if (this.soundId != null) {
            ;
        } else {
            document.querySelector('#upload').classList.remove('wrong-upload');
            soundWarning.classList.add('required');
        }
        return validation;
    }

    generateDataUrlFromFileInput() {
        const input = this.domElement.querySelector("#file");
        const reader = new FileReader();

        reader.onload = (e) => {
            if (!this.uploadImageClicked) {
                this.domElement.querySelector('.icon').classList.remove('visbility-hidden');
            }

            document.querySelectorAll('.required')[0].classList.add('visbility-hidden')
            document.querySelector('.fa-cloud-upload-alt').classList.remove('icon-red');

            this.uploadImageClicked = true;
            this.imageSrc = reader.result;
            this.domElement.querySelector('.icon').style.backgroundImage = `url("${reader.result}")`;
        }

        if (input.value.length) {
            reader.readAsDataURL(input.files[0]);
        }
    }

    generateByteArrayFromFileInput() {
        const input = this.domElement.querySelector("#sound");
        const reader = new FileReader();

        reader.onload = () => {
            if (!this.uploadSoundClicked) {
                this.createPlayButton();
            }

            if (this.source) {
                this.source.stop(0);
                this.source = false;
            }

            document.querySelector('#name').value = input.files[0].name;
            document.querySelector("#name").className = "";

            this.extension = document.querySelector('#name').value.split(/[. ]+/).pop();
            this.buffer = reader.result;
            this.uploadSoundClicked = true;
            this.arraybuffer = input.files[0];
        }

        if (input.value.length) {
            reader.readAsArrayBuffer(input.files[0]);
        }
    }

    copyBuffer(src) {
        const dst = new ArrayBuffer(src.byteLength);
        new Uint8Array(dst).set(new Uint8Array(src));
        return dst;
    }

    playSound() {
        if (this.source === false) {
            const context = new AudioContext();
            const buffer = this.copyBuffer(this.buffer);
            document.querySelector("#play-sound").className = "fas fa-pause";

            context.decodeAudioData(buffer).then((data) => {
                const source = context.createBufferSource();

                this.source = source;
                source.buffer = data;
                source.connect(context.destination);
                source.start(0);

                source.onended = () => {
                    this.source = false;
                    const elem = document.querySelector("#play-sound");
                    if(elem) {
                        elem.className = "fas fa-play-circle";
                    }
                }
            })
        } else {
            document.querySelector("#play-sound").className = "fas fa-play-circle";
            this.source.stop();
            this.source = false;
        }
    }
    
    getSoundsById() {
        return SoundRepository.getSoundById(this.soundId)
        .then((data) => {
            this.imageSrc = data.image;
            document.querySelector('.icon').style.backgroundImage = `url("${data.image}")`;
            document.querySelector('#name').value = data.name;
            document.querySelector('#type').value = data.type.id;
        });
    }
    
    getSoundData() {
        return SoundRepository.getSoundDataById(this.soundId).then(res => {
            this.buffer = res;
            this.arraybuffer = res;
        });
    }
    
    createNewSound(form) {
        if (this.verifyFormData() === true) {
            SoundRepository.createSound(form).then(() => {
                Navigator.goToUrl("/sounds");
            });
        }
    }

    editSoundById(form, id, extension) {
        if (this.verifyFormData() === true) {
            SoundRepository.editSoundById(form, id, extension).then(() => {
                Navigator.goToUrl("/sounds");
            });
        }
    }

    handleAddSound() {
        this.domElement.querySelector('#submit')
            .addEventListener("click", () => this.createNewSound(this.getFormData()));
    }

    handleEditSound() {
        this.getSoundsById();
        this.getSoundData()
            .then(() => {
                this.extension = document.querySelector('#name').value.split(/[. ]+/).pop();
                this.uploadSoundClicked = true;
                this.createPlayButton();
                this.domElement.querySelector('#submit')
                    .addEventListener("click", () => this.editSoundById(this.getFormData(), this.soundId, this.extension));
            })
    }

    createPlayButton() {
        this.domElement.querySelector('.upload-play').insertAdjacentHTML('beforeend', `
            <i class="fas fa-play-circle" id="play-sound"></i>
            `);
        this.domElement.querySelector('#play-sound')
            .addEventListener("click", () => this.playSound());
    }

    createSoundTypesDropdown() {
        this.typesElement = `<option value="">Type</option>`;
        SoundTypeRepository.getTypes()
            .then((data) => {
                this.data = data;
                for (let i = 0; i < this.data.length; i++) {
                    this.typesElement += `
                    <option value="${this.data[i].id}">${this.data[i].name}</option>
                `
                }
                document.querySelector("#type").innerHTML = this.typesElement;
            });
    }

    render() {
        this.domElement.innerHTML = `
            <div class="sound-type-label">
                <div class="sound-type-form">
                    <div class="form-row">
                        <div class="form-text"></div>
                        <div class="validation">
                            <div class="image-width">
                                <label for="file" class="icon cursor-pointer">
                                    <i class="fas fa-cloud-upload-alt icon-text"></i>
                                    <span class="icon-text">Upload Photo</span>
                                </label>
                            </div>
                        <div class="required visbility-hidden required-image">Required</div>
                        </div>
                        <input type="file" name="file" id="file" class="inputfile" accept="image/png, image/jpg, image/jpeg">
                    </div>
                    <div class="form-row">
                        <div class="form-text">
                            <label for="name">Name:<span class="red">*</span></label>
                        </div>
                        <div class="validation">
                            <input type="text" id="name" placeholder="Name">
                            <div class="required visbility-hidden">Required</div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-text">
                            <label for="type">Type:<span class="red">*</span></label>
                        </div>
                        <div class="validation">
                            <select type="type" id="type" required=""></select>
                            <div class="required visbility-hidden">Required</div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-text">
                            <label>Upload sound:<span class="red">*</span></label>
                        </div>
                        <div class="validation">
                            <div>
                                <input type="file" name="sound" id="sound" class="inputfile" accept="audio/mp3,audio/wav"/>
                            </div>
                            <div class='upload-play'>
                                <label for="sound">
                                    <i class="fas fa-cloud-upload-alt cursor-pointer" id="upload"></i>
                                </label>
                            </div>
                            <div class="required visbility-hidden">Required</div>
                        </div>
                    </div>
                    <div class="form-buttons">
                        <button class="confirm-button cursor-pointer" id="submit">Confirm</button>
                    </div>
                </div>
            </div>`;

        if (this.soundId) {
            this.handleEditSound();
        } else {
            this.handleAddSound();
        }

        this.domElement.querySelector("#file")
            .addEventListener("change", () => this.generateDataUrlFromFileInput());

        this.domElement.querySelector("#sound")
            .addEventListener("change", () => this.generateByteArrayFromFileInput());

        this.cancelButton = new Button(this.domElement.querySelector(".form-buttons"), "CANCEL", "cancel-button cursor-pointer", () => { Navigator.goToUrl("/sounds") });
        this.cancelButton.render();
    }
}

export default Sound;