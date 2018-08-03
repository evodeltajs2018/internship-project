import "./SoundsGrid.scss";
import Component from "../../components/Component";
import SoundsGridRepository from "../../repositories/SoundsGridRepository";
import SoundRow from "../../components/soundrow/SoundRow";
import Button from "../../components/button/Button";

class SoundsGrid extends Component {
    constructor(container) {
        super(container, "sounds-grid-container");

       // this.soundsRepository = new SoundsGridRepository();
        this.pagination = {
            currentPage: 1,
            itemsPerPage: 5
        }
        this.getData();
        
    }

    getData() {
        console.log("get data");
        SoundsGridRepository.getData(this.pagination, (data) => {
            console.log(data);
            this.data = data.data;
            this.render();
            this.setupPagination(data.pageCount);
		});
    }

    carouselPage() {
        setInterval(() => {
            this.pagination.currentPage++;
            this.getData();
        }, 2000);
        
    }

    setupPagination(pageCount) {
        for (let i = 1; i <= pageCount; i++) {
            let buttonClass = "pagination-button";
            if (i == this.pagination.currentPage) {
                buttonClass += " current-page";
            }
            let button = new Button(this.soundsPagination, i,
            buttonClass, 
            () => {
                //console.log(button);
                this.pagination.currentPage = button.text;
                this.getData();
            });
            button.render();
            
        }
        let arrowButtonsContainer = document.createElement("div");
        arrowButtonsContainer.className = "arrow-buttons-container";

        this.soundsPagination.appendChild(arrowButtonsContainer);
        let prevButton = new Button(arrowButtonsContainer, `<i class="fas fa-long-arrow-alt-left"></i>previous`, 
        "arrow-button",
        () => {
            this.pagination.currentPage--;
            this.getData();
        });
        
        prevButton.render();
        let nextButton = new Button(arrowButtonsContainer, `next<i class="fas fa-long-arrow-alt-right"></i>`, 
        "arrow-button",
        () => {
            this.pagination.currentPage++;
            this.getData();
        });
        
        nextButton.render();
    }

    render() {
        this.domElement.innerHTML = `
            <div id="sounds-grid-header">
                <div class="sounds-cell">Name</div>
                <div class="sounds-cell">Type</div>
                <div class="actions-cell">Actions</div>
            </div>
            <div id="sounds-grid"></div>
            <div id="sounds-pagination"></div>
            <div class="modals"></div>

        `;

        this.grid = this.domElement.querySelector("#sounds-grid");
        this.soundsPagination = this.domElement.querySelector("#sounds-pagination");
        
        if (this.data) {
            for (let row of this.data) {
                this.htmlRow = new SoundRow(this.grid, row, () => {this.getData()});
                this.htmlRow.render();
            }
        }

        //this.soundsPagination.innerHTML = this.pagination.currentPage;
       
    }

}

export default SoundsGrid;