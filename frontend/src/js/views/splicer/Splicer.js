import Component from "../../components/Component";
import LoadSounds from "../../splicer/load_sounds/LoadSounds";

class Splicer extends Component{
    constructor(container){
        super(container, "splicer");
    }

    render(){
        this.domElement.innerHTML = `<div class="matrix"></div>`;

        this.LoadSounds = new LoadSounds(document.querySelector(".matrix"));
        this.LoadSounds.render();
    }
}

export default Splicer;