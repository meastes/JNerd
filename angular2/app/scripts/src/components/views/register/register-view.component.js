import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterComponent } from 'components/generic/register/register.component';
import { AuthService } from 'services/auth/auth.service';

import template from './register-view.component.html';

@Component({
    selector: 'nrd-register-view',
    template,
    directives: [RegisterComponent],
})
export class RegisterViewComponent {
    constructor(authService: AuthService, router: Router) {
        if (authService.authenticated) {
            router.navigate(['/']);
        }
    }
}
