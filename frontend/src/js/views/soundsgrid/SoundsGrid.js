class SoundsGrid extends Component {
    constructor(container) {
        super(container, "sounds-grid-container");
        this.soundsRepository = new SoundsGridRepository();
        
        this.getData();
    }

    getData() {
        console.log("getting data");
        this.soundsRepository.getData((data) => {
            this.data = data;
            console.log(this.data);
			this.render();
		});
    }

    render() {
        this.domElement.innerHTML = `
            <div id="sounds-grid-header">
                <div class="sounds-cell">Name</div>
                <div class="sounds-cell">Type</div>
                <div class="sounds-cell">Actions</div>
            </div>
            <div id="sounds-grid"></div>
        `;

        this.grid = this.domElement.querySelector("#sounds-grid");
        
        if (this.data) {
            //console.log(this.data);
            for (let row of this.data) {
                this.htmlRow = new SoundRow(this.grid, row);
                this.htmlRow.soundsRepository = this.soundsRepository;
                this.htmlRow.render();
            }
        }
        

    }

}

export default SoundsGrid;