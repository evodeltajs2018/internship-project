import Component from "../../../components/Component";
import Debounce from "../../../utils/Debounce";
import Button from "../../../components/button/Button";
import Navigator from "../../../services/router/Navigator";
import "./SoundFilter.scss";

class SoundFilter extends Component {
    constructor(container, cssClass, updateFunction) {
        super(container, cssClass);
        this.updateHandler = Debounce.debounce(updateFunction, 500);
        this.nameText = "";
        this.typeText = "";
    }

    getFilterData() {
        return {
            name: this.nameText,
            type: this.typeText
        };
    }

    setupFilters() {
        this.domElement.querySelector(".name-search").addEventListener("keyup", (event) => {
            
            this.nameText = event.target.value;
            this.updateHandler(this.getFilterData());
        });

        this.domElement.querySelector(".type-search").addEventListener("keyup", (event) => {
            
            this.typeText = event.target.value;
            this.updateHandler(this.getFilterData());
        });
    }

    render() {
        this.domElement.innerHTML = `
            <div class="searches search-sound">
                <div class="inputs">    
                    <div class="search-input-wrapper">
                        <label class="label-input">Name</label>
                        <input type="text" class="search-input name-search" placeholder="&#xF002 Search">
                    </div>
                    <div class="search-input-wrapper">
                        <label class="label-input">Type</label>
                        <input type="text" class="search-input type-search" placeholder="&#xF002 Search">
                    </div>
                </div>
                <div class="add-button"></div>
            </div>
        `;
        
        this.newButton = new Button(this.domElement.querySelector(".add-button"), `<i class="fas fa-plus"></i>
        Add new sound`, "add-btn cursor-pointer", () => {
            Navigator.goToUrl("/sound");
        });
        this.newButton.render();

        this.setupFilters();
    }
}

export default SoundFilter;