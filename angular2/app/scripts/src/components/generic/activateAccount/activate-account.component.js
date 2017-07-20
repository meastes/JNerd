import { Component, Input, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from 'services/user/user.service';

import template from './activate-account.component.html';

@Component({
    selector: 'nrd-activate-account',
    template,
    directives: [ROUTER_DIRECTIVES],
})
export class ActivateAccountComponent implements OnInit {

    @Input()
    activationKey: string;
    success: boolean = false;
    errorCode: string;

    constructor(userService: UserService) {
        this._userService = userService;
    }

    ngOnInit() {
        this._userService.activate(this.activationKey)
            .catch(err => {
                this.errorCode = err.json().code || 'unknown';
                return Observable.throw(err);
            })
            .subscribe(() => this.success = true);
    }

}
