import Component from "../../components/Component";
import Button from "../../components/button/Button";
import Navigator from "../../services/router/Navigator";
import AuthenticationRepository from "../../repositories/AuthenticationRepository";
import TokenService from "../../services/auth/TokenService";
import "./Profile.scss";

class Profile extends Component {
    constructor(container) {
        super(container, "profile");
        this.token = jwt_decode(TokenService.getToken());

    }

    getFormData() {
        const form = {
            id: jwt_decode(TokenService.getToken()).id,
            roleId: jwt_decode(TokenService.getToken()).roleId,
            email: jwt_decode(TokenService.getToken()).email,
            firstName: this.domElement.querySelector('#first-name').value,
            lastName: this.domElement.querySelector('#last-name').value,
            currPassword: this.domElement.querySelector('#curr-password').value,
            newPassword: this.domElement.querySelector('#new-password').value,
        }
        return form;
    }

    editProfile(data) {
        if (this.verifyFormData()) {
            AuthenticationRepository.editUser(data).then(result => {
                if (result.error) {
                    document.querySelector('.error').innerHTML = `${result.error}`;
                    return { error: result.error };
                } else {
                    document.querySelector('.error').innerHTML = ``;
                    return result;
                }
            })
            .then(check => {
                if (check.error) {
                    document.querySelector('.error').innerHTML = `${check.error}`;
                } else {
                    console.log(check.token)
                    TokenService.setToken(check.token);
                    Navigator.goToUrl("/projects", {refresh: true});
                }
            });
        }
    }

    verifyFormData() {
        const form = this.getFormData();

        const firstNameInput = this.domElement.querySelector("#first-name");
        const firstNameValidator = this.domElement.querySelector('#firstNameValidator');

        const lastNameInput = this.domElement.querySelector("#last-name");
        const lastNameValidator = this.domElement.querySelector('#lastNameValidator');

        const currPasswordInput = this.domElement.querySelector("#curr-password");
        const currPasswordValidator = this.domElement.querySelector("#currentPasswordValidator");

        function clearValidators(input, validator) {
            input.classList.remove('red-border');
            validator.classList.add('hidden');
        }

        clearValidators(firstNameInput, firstNameValidator);
        clearValidators(lastNameInput, lastNameValidator);
        clearValidators(currPasswordInput, currPasswordValidator);

        let validation = true;

        const inputs = [
            {
                input: firstNameInput,
                validator: firstNameValidator
            },
            {
                input: lastNameInput,
                validator: lastNameValidator
            },
            {
                input: currPasswordInput,
                validator: currPasswordValidator
            }
        ];

        inputs.forEach(current => {
            current.input.addEventListener('change', (e) => {
                current.input.classList.remove('wrong-input');
                current.validator.classList.add('hidden');
            });
        })

        function handleErrorClassesChange(input, validator) {
            input.classList.add('wrong-input');
            validator.classList.remove('hidden');
            validation = false;
        }

        if (!form.firstName.trim()) {
            handleErrorClassesChange(firstNameInput, firstNameValidator);
        }

        if (!form.lastName.trim()) {
            handleErrorClassesChange(lastNameInput, lastNameValidator);
        }

        if (!form.currPassword.trim()) {
            handleErrorClassesChange(currPasswordInput, currPasswordValidator);
        }

        return validation;
    }

    createConfirmButton() {
        this.confirmButton = new Button(this.domElement.querySelectorAll(".field")[4], "Confirm", "confirm-button cursor-pointer");
        this.confirmButton.render();

        this.domElement.querySelector('.confirm-button')
            .addEventListener("click", () => this.editProfile(this.getFormData()));
    }

    createCancelButton() {
        this.cancelButton = new Button(this.domElement.querySelectorAll(".field")[4], "CANCEL", "cancel-button cursor-pointer", () => {
            Navigator.goToUrl("/projects");
        });

        this.cancelButton.render();
    }

    render() {
        this.domElement.innerHTML = `
        <div class="container-view">
            <span class="error"></span>
            <div>
                <div class="field">
                    <div class="item left">
                        First Name<span class="red">*</span> :
                    </div>
                    <div class="item">
                        <input type="text" id="first-name" name="firstName" value="${this.token.firstName}" class="width300" placeholder="First Name">
                        <div class="validator">
                            <label class="hidden red" id="firstNameValidator">Required</label>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="item left">
                        Last Name<span class="red">*</span> :
                    </div>
                    <div class="item">
                        <input type="text" id="last-name" name="lastName" value="${this.token.lastName}" class="width300" placeholder="Last Name">
                        <div class="validator">
                            <label class="hidden red" id="lastNameValidator">Required</label>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="item left">
                        Current Password<span class="red">*</span> :
                    </div>
                    <div class="item">
                        <input type="password" id="curr-password" name="currentPassword" value="" class="width300" placeholder="Current Password">
                        <div class="validator">
                            <label class="hidden red" id="currentPasswordValidator">Required</label>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="item left">
                        New Password<span class="red"></span> :
                    </div>
                    <div class="item">
                        <input type="password" id="new-password" name="newPassword" value="" class="width300" placeholder="New Password">
                        <div class="validator">
                            <label class="hidden red" id="newPasswordValidator">Required</label>
                        </div>
                    </div>
                </div>
                <div class="field">
                </div>
            </div>
        </div>
        `;

        this.createConfirmButton();
        this.createCancelButton();
    }
}

export default Profile;