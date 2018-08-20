import Component from "../../components/Component";
import Button from "../../components/button/Button";
import Navigator from "../../services/router/Navigator";
import SoundTypeRepository from "../../repositories/SoundTypeRepository";
import "./SoundType.scss";


class SoundType extends Component {
    constructor(container, typeId = null) {
        super(container, "sound-type");
        this.typeId = typeId;
        this.uploadClicked = false;
    }

    getFormData() {
        const form = {
            name: document.querySelector('#name').value,
            color: document.querySelector('#color').value,
            src: this.buffer
        }
        return form;
    }

    verifyFormData() {
        const data = this.getFormData();
        let validation = true;

        if (data.name.trim() === '') {
            document.querySelectorAll('.required')[0].classList.remove('visbility-hidden');
            document.querySelector("#name").classList.add('input-red');
            
            document.querySelector("#name").addEventListener("change", () => {
                document.querySelectorAll('.required')[0].classList.add('visbility-hidden');
                document.querySelector("#name").classList.remove('input-red');
            })
            validation = false;
        }

        if (data.src == undefined) {
            document.querySelectorAll('.required')[2].classList.remove('visbility-hidden')
            document.querySelector('.fa-cloud-upload-alt').classList.add('icon-red');
            validation = false;
        }

        return validation;
    }

    generateDataUrlFromFileInput() {
        const input = this.domElement.querySelector("#file");
        const reader = new FileReader();

        reader.onload = (e) => {
            if (!this.uploadClicked) {
                this.domElement.querySelector('.icon').classList.remove('visbility-hidden');
            }
            
            document.querySelectorAll('.required')[2].classList.add('visbility-hidden')
            document.querySelector('.fa-cloud-upload-alt').classList.remove('icon-red');

            this.uploadClicked = true;
            this.buffer = reader.result;
            this.domElement.querySelector('.icon').src  = reader.result;
        }

        if (input.value.length) {
            reader.readAsDataURL(input.files[0]);
        }
    }

    getTypeById() {
        return SoundTypeRepository.getTypeById(this.typeId)
            .then((data) => {
                this.buffer = data[0].src;
                document.querySelector('#name').value = data[0].name;
                document.querySelector('#color').value = data[0].color;
                document.querySelector('.icon').src = data[0].src;
        });
    }

    createNewType(form) {
        if (this.verifyFormData()) {
            SoundTypeRepository.createType(form).then(() => {
                Navigator.goToUrl("/types");
            });
        }
    }

    editTypeById(form, id) {
        if (this.verifyFormData()) {
            SoundTypeRepository.editTypeById(form, id).then(() => {
                Navigator.goToUrl("/types");
            });
        }
    }

    handleAddType() {
        this.domElement.querySelector('#submit')
            .addEventListener("click", () => this.createNewType(this.getFormData()));
    }

    handleEditType() {
        this.getTypeById()
        .then(() => {
            if (this.buffer != null) {
                this.domElement.querySelector('.icon').classList.remove('visbility-hidden');
            }
            this.domElement.querySelector('#submit')
                .addEventListener("click", () => this.editTypeById(this.getFormData(), this.typeId));
        })
    }

    render() {
        this.domElement.innerHTML = `
            <div class="sound-type-label">
                <div class="sound-type-form">
                    <div class="form-row">
                        <div class="form-text">
                            <label for="name">Name:<span class="red">*</span></label>
                        </div>
                        <div class="validation">
                            <input type="text" id="name" placeholder="Name"></input>
                            <div class="required visbility-hidden">Required</div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-text">
                            <label>Color:<span class="red">*</span></label>
                        </div>
                        <div class="validation">
                            <div class="color-label">
                                <input type="color" id="color" value="#FFFFFF">
                            </div>
                            <label class="input-color-label" for="color"></label>
                            <div class="required visbility-hidden">Required</div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-text">
                            <label for="icon-src">Icon:<span class="red">*</span></label>
                        </div>
                        <div class="validation">
                            <div class="img-src-label">
                                <input type="file" name="file" id="file" class="inputfile" accept="image/png"/>
                                <div class='upload-play'>
                                <label class="input-upload-label" for="file">
                                    <i class="fas fa-cloud-upload-alt cursor-pointer" id="upload"></i>
                                </label>
                            </div>
                            <div class="required visbility-hidden">Required</div>
                        </div>
                    </div>
                </div>
                <div class="form-buttons">
                    <button class="confirm-button cursor-pointer" id="submit">Confirm</button>
                </div>
                <img class="icon visbility-hidden" src="#" alt="img">
            </div>
            `;

        if (this.typeId) {
            this.handleEditType();
        } else {
            this.handleAddType();
        }
        
        this.domElement.querySelector("#file")
            .addEventListener("change", () => this.generateDataUrlFromFileInput());

        this.cancelButton = new Button(this.domElement.querySelector(".form-buttons"), "CANCEL", "cancel-button cursor-pointer", () => {
            Navigator.goToUrl("/types");
        });
        this.cancelButton.render();
    }

}

export default SoundType;