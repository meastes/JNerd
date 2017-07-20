import template from './activate-account.component.html';

class ActivateAccountComponent {

    activationKey;
    activationErrorCode;
    activationCompleted = false;

    constructor($stateParams, userService) {
        this.activationKey = $stateParams.key;
        this._userService = userService;

        this.init();
    }

    init() {
        this._userService.activate(this.activationKey)
            .then(() => this.activationCompleted = true)
            .catch(res => this.activationErrorCode = res.data.code);
    }

}

ActivateAccountComponent.$inject = ['$stateParams', 'userService'];

export default {
    controller: ActivateAccountComponent,
    template,
    bindings: {
    },
};
