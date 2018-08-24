import TokenService from "../services/auth/TokenService";
class MenuService {
    constructor() {
        this.adminSidebarLinks = [
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
        ];
        this.userSidebarLinks = [
            {
                name: 'Projects',
                icon: 'fas fa-folder',
                route: '/'
            },
        ]
    }

    getSidebarLinks() {
        if (TokenService.getToken() && (jwt_decode(TokenService.getToken()).id === 1))
            return this.adminSidebarLinks;
        return this.userSidebarLinks;
    }
}

export default MenuService;