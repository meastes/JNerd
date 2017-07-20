import { Component } from '@angular/core';
import { OnActivate, RouteSegment } from '@angular/router';

import { ActivateAccountComponent }
    from 'components/generic/activateAccount/activate-account.component';

import template from './activate-view.component.html';

@Component({
    selector: 'nrd-activate-view',
    template,
    directives: [ActivateAccountComponent],
})
export class ActivateViewComponent implements OnActivate {

    activationKey: string;

    routerOnActivate(route: RouteSegment) {
        this.activationKey = route.getParam('key');
    }

}
