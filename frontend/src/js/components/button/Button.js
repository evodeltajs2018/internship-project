class Button extends Component {
	constructor(container, text = "Click me", onClick = () => {}) {
		super(container, "button");

		this.text = text;
		this.onClick = onClick;
	}

	render() {
		this.domElement.innerHTML = `
			<button type="button">${this.text}</button>
		`;

		this.domElement.querySelector("button")
			.addEventListener("click", this.onClick);
	}
}
