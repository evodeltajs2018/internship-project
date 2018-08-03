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
            <div class="buttons"><a href="/">Go home</a></div>
		`;

		this.refreshButton.render();
	}
}

export default NotFound;