class AddingCard extends Component{
    constructor(container){
        super(container,"card");
    }

    addProject(){
        Router.goToUrl("/project");
    }

    render(){
        this.domElement.innerHTML = `<div class="addingCard addingCardImage"><i class="fa fa-plus-circle addButton"></i></div><div class="addingCard addingCardText">ADD NEW PROJECT</div>`;

        this.domElement.querySelector(".addingCardImage").addEventListener("click",()=>{
            this.addProject();
        });
    }

}