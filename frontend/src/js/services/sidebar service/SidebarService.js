class SidebarService {

    static setInactiveIcons(menuElements) {
        for (let menuElement of menuElements) {
            menuElement.classList.remove("active-icon");
        }
    }

    static setActiveIcon(url) {

        url = url.slice(1, url.length);

        const menuElements = document.querySelectorAll(".menu-element");

        SidebarService.setInactiveIcons(menuElements);

        if (url == "") {
            menuElements[0].classList.add("active-icon");
        } else {
            menuElements[0].classList.remove("active-icon");
            for (let menuElement of menuElements) {
                if (menuElement.getAttribute("value").toLowerCase().indexOf(url) > -1) {
                    menuElement.classList.add("active-icon");
                } else {
                    menuElement.classList.remove("active-icon");
                }
            }
        }


    }
}

export default SidebarService;