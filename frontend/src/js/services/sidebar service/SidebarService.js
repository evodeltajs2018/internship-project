
class SidebarService{
    constructor(){
        
        
    }

    static setInactiveIcons(menuElements){
        for (let menuElement of menuElements){
            menuElement.style.color = "gray";
        }
    }
    
    static setActiveIcon(url){

        url = url.slice(1,url.length);
        
        const menuElements = document.querySelectorAll(".menu-element");

        SidebarService.setInactiveIcons(menuElements);

        if(url == ""){
            menuElements[0].style.color = "powderblue";
        }else{
            menuElements[0].style.color = "gray";
            for(let menuElement of menuElements ){
                if(menuElement.getAttribute("value").toLowerCase().indexOf(url) > -1){
                    menuElement.style.color = "powderblue";
                }else{
                    menuElement.style.color = "gray";
                }
            }
        }

       
    }
}

export default SidebarService;