import Component from "../../components/Component";
import Navigator from "../../services/router/Navigator";
import RegisterRepository from "../../repositories/RegisterRepository";
import "./Register.scss";

class Register extends Component {
    constructor(container) {
        super(container, "register");

        particlesJS.load('particles', 'assets/particles.json', function() {
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

    createNewUser() {
        const form = this.getFormData();
        RegisterRepository.createUser(form)
        //.then(Navigator.goToUrl("/sounds"));
    }

    render() {
        this.domElement.innerHTML = `
        <div id="panel">
            <div class="form-title">
                <h1>Splicer</h1>
            </div>
            <form class="auth-form" onsubmit="return false">
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
                    <input class="input" id="password" type="password" placeholder="Password">
                </div>
                <div class="form-row">
                    <label class="input-label" for="confirm_password">
                    <input class="input" id="confirm_password" type="password" placeholder="Confirm Password">
                </div>
                <button class="auth-button" type="submit">Register</button>
            </form>
        </div>
        <div id="particles"></div>
        `;

        this.domElement.querySelector(".auth-button")
            .addEventListener("click", () => { this.createNewUser() } );
    }

}

export default Register;