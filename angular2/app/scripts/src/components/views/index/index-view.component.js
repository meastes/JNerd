import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HelloWorldComponent } from 'components/generic/helloWorld/hello-world.component';

import { HelloService } from 'services/hello/hello.service';
import { AuthService } from 'services/auth/auth.service';

import template from './index-view.component.html';

@Component({
    selector: 'nrd-index-view',
    template,
    directives: [
        ROUTER_DIRECTIVES,
        HelloWorldComponent,
    ],
})
export class IndexViewComponent implements OnInit {

    message: string;
    _helloService: HelloService;
    _authService: AuthService;

    constructor(helloService: HelloService, authService: AuthService) {
        this._helloService = helloService;
        this._authService = authService;
    }

    ngOnInit() {
        if (this.authenticated) {
            this._helloService.helloWorld.subscribe(message => this.message = message);
        }
    }

    get authenticated() {
        return this._authService.authenticated;
    }
}
