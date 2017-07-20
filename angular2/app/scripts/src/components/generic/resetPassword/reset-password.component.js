import { Component, Input, OnInit } from '@angular/core';
import { FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MatchingFieldsValidator } from 'validators/matchingFields/matching-fields.validator';
import { UserService } from 'services/user/user.service';

import template from './reset-password.component.html';

@Component({
    selector: 'nrd-reset-password',
    template,
    directives: [
        FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
    ],
})
export class ResetPasswordComponent implements OnInit {

    // Form
    resetPasswordForm: ControlGroup;
    password: Control;
    retypePassword: Control;

    @Input()
    resetKey: string;
    success: boolean = false;
    errorCode: string;

    // Map error returned by the service to the form error
    errors = {
        invalidKey: () => this.resetPasswordForm.setErrors({ invalidKey: true }),
        unknown: () => this.resetPasswordForm.setErrors({ unknown: true }),
    };

    constructor(formBuilder: FormBuilder, userService: UserService) {
        this._userService = userService;
        this._formBuilder = formBuilder;
    }

    ngOnInit() {
        this.password = new Control('', Validators.required);
        this.retypePassword = new Control('');
        this.resetPasswordForm = this._formBuilder.group({
            passwords: this._formBuilder.group({
                password: this.password,
                retypePassword: this.retypePassword,
            }, { validator: MatchingFieldsValidator.matchingFields }),
        });
    }

    resetPassword() {
        if (this.resetPasswordForm.valid) {
            const password = this.password.value;

            this._userService.resetPassword(this.resetKey, password)
                .subscribe(
                    // Next
                    null,
                    // Error
                    // Translate the error using the map,
                    // or show unknown if we don't have a valid code
                    error => (this.errors[error.json().code] || this.errors.unknown)(),
                    // Completed
                    () => this.success = true);
        }
    }

    clearCustomErrors() {
        this.resetPasswordForm.updateValueAndValidity();
    }

}
