class Modal extends Component{
    constructor(container, title, text){
        super(container, "modal");
        this.title = title;
        this.text = text;
    }

    render(){
        this.domElement.innerHTML = `
        <div class="modalContent">
            <div class="modalHeader">${this.title}<i class="fa fa-close closeButton"></i></div>
            <div class="modalBody">${this.text}</div>
            <div class="modalFooter"><button class="confirmButton">Confirm</button><button class="cancelButton">CANCEL</button></div>
        </div>
        `
        this.closeButtonHandler();
        this.cancelButtonHandler();
    }

    closeButtonHandler(){
        this.closeButton = document.getElementsByClassName("closeButton")[0];
        this.closeButton.addEventListener("click",() => {
            document.getElementsByClassName("modal")[0].style.display = "none";
        })
    }
    cancelButtonHandler(){
        this.cancelButton = document.getElementsByClassName("cancelButton")[0];
        this.cancelButton.addEventListener("click",() =>{
            document.getElementsByClassName("modal")[0].style.display = "none";
        })
    }
    confirmButtonHandler(){
        // delete project
    }

}
