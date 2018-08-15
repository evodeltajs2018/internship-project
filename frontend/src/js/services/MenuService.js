class MenuService {
    constructor() {
        this.sidebarLinks = [
            {
                name: 'Projects',
                icon: 'fas fa-folder',
                route: '/'
            },
            {
                name: 'Sounds',
                icon: 'fab fa-soundcloud',
                route: '/sounds'
            },
            {
                name: 'Types',
                icon: 'fas fa-music',
                route: '/types'
            }
        ]
    }

    getSidebarLinks() {
        return this.sidebarLinks;
    }
}

export default MenuService;