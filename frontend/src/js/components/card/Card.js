class Card extends Component{
    constructor(container,project){
        super(container,"card");
        this.project=project;
    }

    render(){
        this.domElement.innerHTML = `
        <div class="cardHeader content"><i class="fa fa-times-circle deleteButton"></i> <div>${this.project.title}<br>${this.project.genre}</div></div>

        <div class="cardBody content">
        <p class="cardText">${this.project.description}</p></div>

        <div class="cardFooter content"><div class="cardDescription">Description</div>
        <button class="leftButton button">OPEN</button><button class="rightButton button">EDIT</button>
        </div>
        `;
        
    }

    deleteButtonHandler(){
        document.getElementsByClassName("modal")[0].style.display = "block";
    }

    openButtonHandler(){
        // open project
    }

    editButtonHandler(){
        // edit project
    }

}