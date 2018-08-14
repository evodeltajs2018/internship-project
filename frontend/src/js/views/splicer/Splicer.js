import Component from "../../components/Component";
import Engine from "./engine/Engine";

class Splicer extends Component{
    constructor(container, projectId){
        super(container, "splicer");
        this.projectId = projectId;
        this.setup();
    }

    setup() {
        this.domElement.innerHTML = `
            <div class="splice-header"></div>
            <div class="splicer-main"></div>
        `;
        this.engine = new Engine(this.domElement.querySelector(".splice-header"));
        this.engine.render();
    }

    render(){
        this.domElement.querySelector(".splicer-main").innerHTML = `
            <div class="matrix">
                Project ${this.projectId}
            </div>
            
        `;

    }
}

export default Splicer;