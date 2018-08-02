class SoundRow extends Component {
    constructor(container, sound) {
        super(container, "sounds-grid-row");
      
        this.sound = sound;
        console.log(this.sound);
    }

    render() {
        this.domElement.innerHTML = `
            
            <div class="sounds-cell sound-name">${this.sound.name}</div>
            <div class="sounds-cell sound-type">${this.sound.type}</div>
            <div class="sounds-cell sound-action-buttons">
                
            </div>

        `;

        this.editButton = document.createElement("i");
        this.editButton.className = "fas fa-pen";
        this.domElement.querySelector(".sound-action-buttons")
            .appendChild(this.editButton);
        

        this.deleteButton = document.createElement("i");
        this.deleteButton.className = "fas fa-trash";
        this.domElement.querySelector(".sound-action-buttons")
            .appendChild(this.deleteButton);
        
        this.editButton.addEventListener("click", () => {
            console.log("clicked edit on " + this.sound.id);
        });
        
        this.deleteButton.addEventListener("click", () => {
            console.log("clicked delete on " + this.sound.id);
            this.soundsRepository.deleteSound(this.sound.id, () => {this.unrender();});

        });

    }
}