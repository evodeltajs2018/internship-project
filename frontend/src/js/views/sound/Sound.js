class Sound extends Component {
    constructor(container) {
        super(container, "add-sound");
        this.router = new Router();

    }

    addButtonHandler() {
        console.log("Submit the form");
    }

    cancelButtonHandler() {
        Router.goToUrl('/sounds');
    }

    submitForm() {
        const form = {
            name: document.querySelector('#name').value,
            type: document.querySelector('#type').value,
            submit: document.querySelector('#submit').value
        }

        const request = new XMLHttpRequest();

        /*         request.onload = () => {
                    let responseObject = null;
        
                    try {
                        responseObject = JSON.parse(request.responseText);
                    } catch (e) {
                        console.log ('Could not parse JSON');
                    }
                } */

        const requestData = `name=${form.name}&type=${form.type}`;
        console.log(requestData);

        request.open('POST', 'http://localhost:5000/sound');
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(requestData);
    }

    render() {
        this.domElement.innerHTML = `
            <div class="sound-form">
                <div>
                    <label for="name">Name:*</label>
                    <input type="text" id="name"></input>
                </div>
                <div>
                    <label for="type">Type:*</label>
                    <input type="text" id="type"></input>
                </div>
                <div>
                Upload Sound:* <i class="fas fa-cloud-upload-alt fa-1x" style="color: gray"></i>
                </div>
                <button type="submit" class="confirmButton" id="submit"}>Confirm</button>
            </div>
            `;
        /*         this.addButton = new Button(this.domElement.querySelector(".sound-form"),"Confirm","confirmButton",()=>{
                        this.addButtonHandler();
                });
                this.addButton.render(); */

        this.domElement.querySelector('#submit')
            .addEventListener("click", () => this.submitForm());

        this.cancelButton = new Button(this.domElement.querySelector(".sound-form"), "CANCEL", "cancelButton", () => {
            this.cancelButtonHandler();
        });
        this.cancelButton.render();
    }

}
