import { Component } from '@angular/core';
import { OnActivate, RouteSegment } from '@angular/router';

import { ResetPasswordComponent }
    from 'components/generic/resetPassword/reset-password.component';

import template from './reset-view.component.html';

@Component({
    selector: 'nrd-reset-view',
    template,
    directives: [ResetPasswordComponent],
})
export class ResetViewComponent implements OnActivate {

    resetKey: string;

    routerOnActivate(route: RouteSegment) {
        this.resetKey = route.getParam('key');
    }

}
