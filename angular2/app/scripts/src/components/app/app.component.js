import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { NavigationComponent } from 'components/generic/navigation/navigation.component';
import { AuthService } from 'services/auth/auth.service';

import routes from 'config/routes';
import template from './app.component.html';

@Component({
    selector: 'nrd-app',
    template,
    directives: [
        ROUTER_DIRECTIVES,
        NavigationComponent,
    ],
})
@Routes(routes)
export class AppComponent implements OnInit {

    authenticated: boolean = false;
    _authService: AuthService;

    constructor(authService: AuthService) {
        this._authService = authService;
    }

    ngOnInit() {
        this.authenticated = !!this._authService.updateAuthFromStore();
    }

}
