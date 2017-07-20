import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginComponent } from 'components/generic/login/login.component';
import { AuthService } from 'services/auth/auth.service';

import template from './login-view.component.html';

@Component({
    selector: 'nrd-login-view',
    template,
    directives: [LoginComponent],
})
export class LoginViewComponent {
    constructor(authService: AuthService, router: Router) {
        if (authService.authenticated) {
            router.navigate(['/']);
        }
    }
}
