export class LoginView {
    constructor($rootScope, $state) {
        if ($rootScope.authenticated) {
            $state.go('index');
        }
    }
}

LoginView.$inject = ['$rootScope', '$state'];
