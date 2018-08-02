import Component from "../../components/Component";
import Button from "../../components/button/Button";
import "./NotFound.scss";

class NotFound extends Component {
	constructor(container) {
		super(container, "not-found");
	}

	render() {
		this.domElement.innerHTML = `
            <h1>404 Not Found</h1>
            <div class="buttons"></div>
		`;

		this.refreshButton = new Button(
			this.domElement.querySelector(".buttons"));

		this.refreshButton.text = "Go back";
		this.refreshButton.onClick = () => {
			//this.getData();
			Router.goToUrl("/");
		
		};

		this.refreshButton.render();
	}
}

export default NotFound;