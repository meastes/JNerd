import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators } from '@angular/common';
import { Router } from '@angular/router';

import { UserService } from 'services/user/user.service';
import { AuthService } from 'services/auth/auth.service';

import template from './login.component.html';

@Component({
    selector: 'nrd-login',
    directives: [FORM_DIRECTIVES],
    template,
})
export class LoginComponent implements OnInit {

    // Form
    loginForm: ControlGroup;
    username: Control;
    password: Control;
    remember: Control;

    resendSuccess: boolean = false;
    sendResetSuccess: boolean = false;
    _router: Router;
    _userService: UserService;
    _authService: AuthService;
    _formBuilder: FormBuilder;

    // Map error returned by the service to the form error
    errors = {
        loginValid: () => this.password.setErrors({ invalid: true }),
        activated: () => this.loginForm.setErrors({ activated: true }),
        alreadyActivated: () => this.loginForm.setErrors({ alreadyActivated: true }),
        noAccount: () => this.loginForm.setErrors({ noAccount: true }),
        unknown: () => this.loginForm.setErrors({ unknown: true }),
    };

    constructor(router: Router,
                userService: UserService,
                authService: AuthService,
                formBuilder: FormBuilder) {
        this._router = router;
        this._userService = userService;
        this._authService = authService;
        this._formBuilder = formBuilder;
    }

    ngOnInit() {
        this.username = new Control('', Validators.required);
        this.password = new Control('', Validators.required);
        this.remember = new Control('');
        this.loginForm = this._formBuilder.group({
            username: this.username,
            password: this.password,
            remember: this.remember,
        });
    }

    login() {
        this.clearCustomErrors();
        if (this.loginForm.valid) {
            const { username, password, remember } = this.loginForm.value;
            this._userService.authenticate(
                username,
                password,
                remember,
            ).subscribe(
                // Next
                token => this._authService.updateAuthWithToken(token, this.remember),
                // Error
                // Translate the error using the map, or show unknown if we don't have a valid code
                error => (this.errors[error.json().code] || this.errors.unknown)(),
                // Completed
                () => this._router.navigate(['/'])
            );
        }
    }

    clearCustomErrors() {
        this.loginForm.updateValueAndValidity();
        this.password.updateValueAndValidity();
    }

    resendActivation() {
        this._userService.resendActivation(this.username.value)
            .subscribe(() => this.resendSuccess = true);
        return false;
    }

    sendResetPassword() {
        this._userService.sendResetPassword(this.username.value)
            .subscribe(() => this.sendResetSuccess = true);
        return false;
    }

}
