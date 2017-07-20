import template from './hello-world.component.html';

class HelloWorldComponent {
    constructor(helloService) {
        this._helloService = helloService;

        this.message = '';

        this.init();
    }

    init() {
        this._helloService.getMessage().then(message => this.message = message);
    }
}

HelloWorldComponent.$inject = ['helloService'];

export default {
    controller: HelloWorldComponent,
    template,
    bindings: {
    },
};
