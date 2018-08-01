class SoundsGrid extends Component {
    constructor(container) {
        super(container);
        this.soundsRepository = new SoundsGridRepository();
        
        this.getData();
    }

    getData() {
        this.soundsRepository.getData((data) => {
            this.data = data;
            
			this.render();
		});
    }

    render() {
        this.domElement.innerHTML = `
            <div>GRID</div>
            <pre>${JSON.stringify(this.data, "", 2)}</pre>
        `;
    }

}