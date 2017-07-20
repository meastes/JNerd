import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { AuthService } from 'services/auth/auth.service';

import template from './navigation.component.html';

@Component({
    selector: 'nrd-navigation',
    template,
    directives: [ROUTER_DIRECTIVES],
})
export class NavigationComponent {

    _router: Router;
    _authService: AuthService;

    constructor(router: Router, authService: AuthService) {
        this._router = router;
        this._authService = authService;
    }

    logout() {
        this._authService.deleteAuthData().subscribe(() => this._router.navigate(['/']));
    }

    get authenticated() {
        return this._authService.authenticated;
    }
}
