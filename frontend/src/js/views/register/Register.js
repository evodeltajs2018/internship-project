import Component from "../../components/Component";
import Navigator from "../../services/router/Navigator";
import RegisterRepository from "../../repositories/RegisterRepository";
import "./Register.scss";

class Register extends Component {
    constructor(container) {
        super(container, "register");
        this.errorsArray = [];

        particlesJS.load('particles', 'assets/particles.json', function () {
            console.log('Particles.js config loaded');
        });

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
        return data;
    }

    validationForm() {
        const inputs = document.querySelectorAll('.input');
        let validation = true;
        console.log(inputs);

        return validation;
    }

    createNewUser() {
        this.errorsArray = [];
        const form = this.getFormData();
        if (this.validationForm()) {
            RegisterRepository.createUser(form).then(result => {
                if (result.error) {
                    //this.errorsArray.push(result.error);
                    document.querySelector('.error').innerHTML = `
                    ${result.error}
                    `;
                    return { error: result.error };
                    console.log(result.error);
                } else {
                    document.querySelector('.error').innerHTML = `
                    `;
                    console.log(result);
                    return result;
                }
            })
            .then(check => {
                console.log(check.error)
                if (check.error) {
                    this.errorsArray.push(check.error);
                } else {
                    //Navigator.goToUrl("/sounds")
                }
            });
        }
        console.log(this.errorsArray);
    }

    render() {
        this.domElement.innerHTML = `
        <div id="panel">
            <div class="form-title">
                <h1>Splicer</h1>
            </div>
            <form class="auth-form" onsubmit="return false">
                <span class="error"></span>
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
                    <input class="input" id="username" type="text" placeholder="Username" required>
                </div>
                <div class="form-row">
                    <label class="input-label" for="email">
                    <input class="input" id="email" type="email" placeholder="Email" required>
                </div>
                <div class="form-row">
                    <label class="input-label" for="password">
                    <input class="input" id="password" type="password" placeholder="Password" pattern="^\S{6,}$" onchange="this.setCustomValidity(this.validity.patternMismatch ? 'Must have at least 6 characters' : ''); if(this.checkValidity()) form.password_two.pattern = this.value;">
                </div>
                <div class="form-row">
                    <label class="input-label" for="confirm_password">
                    <input class="input" id="confirm_password" type="password" placeholder="Confirm Password" pattern="^\S{6,}$" onchange="this.setCustomValidity(this.validity.patternMismatch ? 'Please enter the same Password as above' : '');">
                </div>
                <button class="auth-button" type="submit">Register</button>
            </form>
        </div>
        <div id="particles"></div>
        `;
/* 
        this.domElement.querySelector(".auth-button")
            .addEventListener("click", () => { this.createNewUser() }); */

        this.domElement.querySelector(".auth-form").addEventListener("submit", function() {
            console.log("hi");
        })
    }

}

export default Register;