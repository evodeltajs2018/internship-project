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
            }
        ]
    }

    getSidebarLinks() {
        return this.sidebarLinks;
    }
}