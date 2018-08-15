import Component from "../../../components/Component";
import Debounce from "../../../utils/Debounce";
import "./TypeFilter.scss";

class TypeFilter extends Component {
    constructor(container, cssClass, updateFunction) {
        super(container, cssClass);
        this.updateHandler = Debounce.debounce(updateFunction, 500);
        this.nameText = "";
    }

    getFilterData() {
        return {
            name: this.nameText
        };
    }

    setupFilters() {
        this.domElement.querySelector(".name-search").addEventListener("keyup", (event) => {
            
            this.nameText = event.target.value;
            this.updateHandler(this.getFilterData());
        });
    }

    render() {
        this.domElement.innerHTML = `
            <div class="type-searches">
                <div class="search-input-wrapper">
                    <label class="label-input">Name</label>
                    <input type="text" class="search-input name-search" placeholder="&#xF002 Search">
                </div>

                <a class="add-type-btn" href="/type">
                    <i class="fas fa-plus"></i>
                    Add new type
                </a>
            </div>
        `;
        this.setupFilters();
    }
}

export default TypeFilter;