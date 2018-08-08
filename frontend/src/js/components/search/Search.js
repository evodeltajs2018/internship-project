import Component from "../Component";
import "./Search.scss";

class Search extends Component{
    constructor(container, label){
        super(container);

        this.label = label;

    }

    render(){
        this.domElement.innerHTML = `<div class="search-input-wrapper"><label for="name" class="label-input">${this.label}</label><input type="text" name="${this.label}" class="search-input" placeholder="&#xF002 Search" value=""></input></div>`;
    }
}

export default Search;