import Component from "../../components/Component";
import Navigator from "../../services/router/Navigator";
import RegisterRepository from "../../repositories/RegisterRepository";
import Button from "../../components/button/Button";

import "./Register.scss";

class Register extends Component {
    constructor(container) {
        super(container, "register");

    }

    getFormData() {
        const inputs = document.querySelectorAll('.form-row input');
        const data = {
            firstName: inputs[0].value,
            lastName: inputs[1].value,
            username: inputs[2].value,
            email: inputs[3].value,
            password: inputs[4].value
        }
        console.log(data);
        return data;
    }

    createNewUser() {
        const form = this.getFormData();
        RegisterRepository.createUser(form);
    }

    render() {
        this.domElement.innerHTML = `
        <div class="form-title">
            <h1>Splicer</h1>
        </div>
        <div class="auth-form">
            <div class="form-row">
                <label class="input-label" for="first-name">
                <input class="input" id="first-name" type="text" placeholder="First Name">
            </div>
            <div class="form-row">
                <label class="input-label" for="last-name">
                <input class="input" id="last-name" type="text" placeholder="Last Name">
            </div>
            <div class="form-row">
                <label class="input-label" for="username">
                <input class="input" id="username" type="text" placeholder="Username">
            </div>
            <div class="form-row">
                <label class="input-label" for="email">
                <input class="input" id="email" type="text" placeholder="Email">
            </div>
            <div class="form-row">
                <label class="input-label" for="password">
                <input class="input" id="password" type="password" placeholder="Password">
            </div>
            <div class="form-row">
                <label class="input-label" for="confirm_password">
                <input class="input" id="confirm_password" type="password" placeholder="Confirm Password">
            </div>
            <div class="form-button">
            </div>
        </div>
        `;

        //console.log(this.getFormData());

        this.registerButton = new Button(this.domElement.querySelector(".form-button"), "Register", "auth-button", () => { this.createNewUser() });
        this.registerButton.render();
    }

}

export default Register;