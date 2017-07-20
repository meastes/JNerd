import template from './reset-password.component.html';

class ResetPasswordComponent {

    passwordResetKey;
    password;
    passwordVerify;
    passwordResetErrorCode;
    passwordResetCompleted = false;

    // Map error returned by the service to the form error
    errors = {
        invalidKey: () => this.$scope.passwordResetForm.$setValidity('invalidKey', false),
        unknown: () => this.$scope.registerForm.$setValidity('unknown', false),
    };

    constructor($scope, $stateParams, userService) {
        this.$scope = $scope;
        this.passwordResetKey = $stateParams.key;
        this._userService = userService;
    }

    resetPassword() {
        this.resetCustomErrors();
        if (this.password !== this.passwordVerify) {
            this.$scope.passwordResetForm.passwordVerify.$setValidity('match', false);
        } else {
            if (this.$scope.passwordResetForm.$valid) {
                this._userService.resetPassword(this.passwordResetKey, this.password)
                    .then(() => this.passwordResetCompleted = true)
                    // Translate the error using the map,
                    // or show unknown if we don't have a valid code
                    .catch(res => (this.errors[res.data.code] || this.errors.unknown)());
            }
        }
    }

    resetCustomErrors() {
        this.$scope.passwordResetForm.passwordVerify.$setValidity('match', true);
        this.$scope.passwordResetForm.$setValidity('invalidKey', true);
        this.$scope.passwordResetForm.$setValidity('unknown', true);
    }

}

ResetPasswordComponent.$inject = ['$scope', '$stateParams', 'userService'];

export default {
    controller: ResetPasswordComponent,
    template,
    bindings: {
    },
};
