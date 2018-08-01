class AddingCard extends Component{
    constructor(container){
        super(container,"card");
    }

    render(){
        this.domElement.innerHTML = `<div class="addingCard addingCardImage"><i class="fa fa-plus-circle"></i></div><div class="addingCard addingCardText">ADD NEW PROJECT</div>`;
    }

    addNewCard(){
        //adding new card
    }
}