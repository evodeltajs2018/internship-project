import Component from "../../components/Component";
import "./AddingCard.scss";
import Router from "../../services/router/Router";

class AddingCard extends Component{
    constructor(container){
        super(container,"card");
    }

    addProject(){
        // Router.goToUrl("/project"); - to do
    }

    render(){
        this.domElement.innerHTML = `<div class="addingCard addingCardImage"><i class="fa fa-plus-circle addButton"></i></div><div class="addingCard addingCardText">ADD NEW PROJECT</div>`;

        this.domElement.querySelector(".addingCardImage").addEventListener("click",()=>{
            this.addProject();
        });
    }

}

export default AddingCard;