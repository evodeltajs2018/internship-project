class Button extends Component {
	constructor(container, text = "Click me", buttonClass, onClick = () => {}) {
		super(container, "button");

		this.text = text;
		this.buttonClass = buttonClass;
		this.onClick = onClick;
	}

	render() {
		this.domElement.innerHTML = `
			<button type="button" class="${this.buttonClass}">${this.text}</button>
		`;

		this.domElement.querySelector("button")
			.addEventListener("click", this.onClick);
	}
}
