import Component from "../../components/Component";
import "./Forbidden.scss";
class Forbidden extends Component{
    constructor(container){
        super(container, "forbidden");
    }

    render(){
        this.domElement.innerHTML = "You don't have the permission to access this page!";
    }
}

export default Forbidden;