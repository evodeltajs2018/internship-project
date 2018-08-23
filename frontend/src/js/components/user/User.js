import Component from "../Component";
import TokenService from "../../services/auth/TokenService";
import Navigator from "../../services/router/Navigator";
import "./User.scss";

class User extends Component {
	constructor(container, token) {
		super(container, "user");
        this.clicked = false;
        if (TokenService.getToken()) {
            this.token = token;
            this.data = this.decodeToken();
            this.initials = this.generateNameInitials();
            this.render();
        }
    }

    decodeToken() {
        return jwt_decode(this.token);
    }

    onLogOut() {
        TokenService.destroyToken();
        this.token = null;
        Navigator.goToUrl("/login");
    }

    generateNameInitials() {
        this.initials = this.data.lastName[0].toUpperCase(); 
        this.initials += this.data.firstName[0].toUpperCase();

        return this.initials;
    }

    handleUserClick(visible) {
        if (!visible) {
            document.querySelectorAll('.user-item')[0].style.visibility = "visible";
            document.querySelectorAll('.user-item')[1].style.visibility = "visible";
            document.querySelector('.user-menu').style.visibility = "visible";
            document.querySelector('.user-menu').style.height = "70px";
            this.clicked = true;
        } else {
            document.querySelectorAll('.user-item')[0].style.visibility = "hidden";
            document.querySelectorAll('.user-item')[1].style.visibility = "hidden";
            document.querySelector('.user-menu').style.visibility = "hidden";
            document.querySelector('.user-menu').style.height = "0px";
            this.clicked = false;
        }

    }

	render() {
        this.domElement.innerHTML = `
            <div class="user-logo">${this.initials}</div>
            <div class="user-menu">
                <div class="user-item user-profile">Profile</div>
                <div class="user-item user-logout">Logout</div>
            </div>
		`;

        this.domElement.querySelector(".user-logo")
            .addEventListener("click", () => { this.handleUserClick(this.clicked) })

		this.domElement.querySelector(".user-logout")
            .addEventListener("click", () => { this.onLogOut() } );
            
        this.domElement.querySelector(".user-profile")
            .addEventListener("click", () => { Navigator.goToUrl('/profile') } );
	}
}

export default User;
