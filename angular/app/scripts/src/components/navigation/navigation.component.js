import template from './navigation.component.html';

class NavigationComponent {
    constructor($state, userService) {
        this._router = $state;
        this._userService = userService;
    }

    logout() {
        this._userService.logout().then(() => this._router.go('index', {}, { reload: true }));
    }
}

NavigationComponent.$inject = ['$state', 'userService'];

export default {
    controller: NavigationComponent,
    template,
    bindings: {
        authenticated: '<',
    },
};
