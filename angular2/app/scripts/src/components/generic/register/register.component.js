import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators } from '@angular/common';

import { MatchingFieldsValidator } from 'validators/matchingFields/matching-fields.validator';
import { UserService } from 'services/user/user.service';

import template from './register.component.html';

@Component({
    selector: 'nrd-register',
    template,
    directives: [FORM_DIRECTIVES],
})
export class RegisterComponent implements OnInit {

    // Form
    registerForm: ControlGroup;
    username: Control;
    email: Control;
    password: Control;
    retypePassword: Control;

    registerSuccess: boolean = false;
    _userService: UserService;
    _formBuilder: FormBuilder;

    // Map error returned by the service to the form error
    errors = {
        uniqueUsername: () => this.username.setErrors({ uniqueUsername: true }),
        uniqueEmail: () => this.email.setErrors({ uniqueEmail: true }),
        unknown: () => this.registerForm.setErrors({ unknown: true }),
    };

    constructor(formBuilder: FormBuilder, userService: UserService) {
        this._userService = userService;
        this._formBuilder = formBuilder;
    }

    ngOnInit() {
        this.username = new Control('',
            Validators.compose([
                Validators.required,
                Validators.maxLength(50),
            ])
        );
        this.email = new Control('',
            Validators.compose([
                Validators.required,
                // Match email address format
                Validators.pattern('[\\w-+]+@([\\w-]+\\.)+[\\w-]+'),
                Validators.maxLength(100),
            ])
        );
        this.password = new Control('', Validators.required);
        this.retypePassword = new Control('');
        this.registerForm = this._formBuilder.group({
            username: this.username,
            email: this.email,
            passwords: this._formBuilder.group({
                password: this.password,
                retypePassword: this.retypePassword,
            }, { validator: MatchingFieldsValidator.matchingFields }),
        });
    }

    register() {
        if (this.registerForm.valid) {
            const { username, email } = this.registerForm.value;
            const password = this.password.value;

            this._userService.register(username, email, password)
                .subscribe(
                    // Next
                    null,
                    // Error
                    // Translate the error using the map,
                    // or show unknown if we don't have a valid code
                    error => (this.errors[error.json().code] || this.errors.unknown)(),
                    // Completed
                    () => this.registerSuccess = true);
        }
    }

    clearCustomErrors() {
        this.registerForm.updateValueAndValidity();
        this.username.updateValueAndValidity();
        this.email.updateValueAndValidity();
    }

}
