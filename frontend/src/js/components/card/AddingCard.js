import Component from "../../components/Component";
import "./AddingCard.css";

class AddingCard extends Component{
    constructor(container){
        super(container,"card");
    }

    addProject(){
    }

    render(){
        this.domElement.innerHTML = `<div class="addingCard addingCardImage"><i class="fa fa-plus-circle addButton"></i></div><div class="addingCard addingCardText">ADD NEW PROJECT</div>`;

        this.domElement.querySelector(".addingCardImage").addEventListener("click",()=>{
            this.addProject();
        });
    }

}

export default AddingCard;