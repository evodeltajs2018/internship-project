import Button from "../../components/button/Button";
import Component from "../../components/Component";
import Navigator from "../../services/router/Navigator";

class Dummy extends Component {
    constructor(container) {
        super(container, "dashboard");

        //this.dashboardRepo = new DashboardRepository();
        this.data = null;


    }


    render() {
        this.domElement.innerHTML = `
			<h1>dumb component</h1>

			<div class="buttons">
			</div>
		`;

        this.refreshButton = new Button(
            this.domElement.querySelector(".buttons"));

        this.refreshButton.text = "Refresh";
        this.refreshButton.onClick = () => {

           Navigator.goToUrl("/");

        };

        this.refreshButton.render();
    }
}

export default Dummy;