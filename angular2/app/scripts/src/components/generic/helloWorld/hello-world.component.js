import { Component, Input } from '@angular/core';

import template from './hello-world.component.html';

@Component({
    selector: 'nrd-hello-world',
    template,
})
export class HelloWorldComponent {
    @Input()
    message: string;
}
