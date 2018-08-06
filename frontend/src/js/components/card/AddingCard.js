import Component from "../../components/Component";
import "./AddingCard.scss";

class AddingCard extends Component{
    constructor(container){
        super(container,"addingCard");
    }

    addProject(){
    }

    render(){
        this.domElement.innerHTML = `<div class="addingCardImage"><i class="fa fa-plus-circle addButton"></i></div><div class="addingCardText">ADD NEW PROJECT</div>`;

        this.domElement.querySelector(".addingCardImage").addEventListener("click",()=>{
            this.addProject();
        });
    }

}

export default AddingCard;