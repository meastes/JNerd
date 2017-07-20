import template from './login.component.html';

class LoginComponent {

    username;
    password;
    rememberMe = false;
    resendSuccess = false;
    sendResetSuccess = false;
    lastUsername;

    // Map error returned by the service to the form error
    errors = {
        loginValid: () => this.$scope.loginForm.password.$setValidity('loginValid', false),
        activated: () => this.$scope.loginForm.$setValidity('activated', false),
        alreadyActivated: () => this.$scope.loginForm.$setValidity('alreadyActivated', false),
        noAccount: () => this.$scope.loginForm.$setValidity('noAccount', false),
        unknown: () => this.$scope.loginForm.$setValidity('unknown', false),
    };

    constructor($scope, $state, userService) {
        this.$scope = $scope;
        this._router = $state;
        this._userService = userService;
    }

    login() {
        this.resetCustomErrors();
        this.lastUsername = this.username;
        if (this.$scope.loginForm.$valid) {
            this._userService.authenticate(this.username, this.password, this.rememberMe)
                .then(() => this._router.go('index'))
                // Translate the error using the map, or show unknown if we don't have a valid code
                .catch(res => (this.errors[res.data.code] || this.errors.unknown)());
        }
    }

    resetCustomErrors() {
        this.$scope.loginForm.password.$setValidity('loginValid', true);
        this.$scope.loginForm.$setValidity('activated', true);
        this.$scope.loginForm.$setValidity('unknown', true);
        this.$scope.loginForm.$setValidity('alreadyActivated', true);
        this.$scope.loginForm.$setValidity('noAccount', true);
    }

    resendActivation() {
        this.resetCustomErrors();
        this._userService.resendActivation(this.lastUsername)
            .then(() => this.resendSuccess = true)
            // Translate the error using the map, or show unknown if we don't have a valid code
            .catch(res => (this.errors[res.data.code] || this.errors.unknown)());
    }

    sendResetPassword() {
        this.resetCustomErrors();
        this._userService.sendResetPassword(this.lastUsername)
            .then(() => this.sendResetSuccess = true)
            .catch(() => this.$scope.loginForm.$setValidity('unknown', false));
    }
}

LoginComponent.$inject = ['$scope', '$state', 'userService'];

export default {
    controller: LoginComponent,
    template,
    bindings: {
    },
};
