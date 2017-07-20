import { User } from '../../models/user/user.model.js';

import template from './register.component.html';

class RegisterComponent {

    username;
    password;
    passwordVerify;
    email;
    registerSuccess = false;

    // Map error returned by the service to the form error
    errors = {
        uniqueUsername: () => this.$scope.registerForm.username.$setValidity('unique', false),
        uniqueEmail: () => this.$scope.registerForm.email.$setValidity('unique', false),
        unknown: () => this.$scope.registerForm.$setValidity('unknown', false),
    };

    constructor($scope, $state, userService) {
        this.$scope = $scope;
        this._router = $state;
        this._userService = userService;
    }

    register() {
        this.resetCustomErrors();
        if (this.password !== this.passwordVerify) {
            this.$scope.registerForm.passwordVerify.$setValidity('match', false);
        } else {
            if (this.$scope.registerForm.$valid) {
                this._userService.register(new User(this.username, this.password, this.email))
                    .then(() => this.registerSuccess = true)
                    // Translate the error using the map,
                    // or show unknown if we don't have a valid code
                    .catch(res => (this.errors[res.data.code] || this.errors.unknown)());
            }
        }
    }

    resetCustomErrors() {
        this.$scope.registerForm.username.$setValidity('unique', true);
        this.$scope.registerForm.email.$setValidity('unique', true);
        this.$scope.registerForm.passwordVerify.$setValidity('match', true);
        this.$scope.registerForm.$setValidity('unknown', true);
    }
}

RegisterComponent.$inject = ['$scope', '$state', 'userService'];

export default {
    controller: RegisterComponent,
    template,
    bindings: {
    },
};
