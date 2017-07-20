import angular from 'angular';

import { LocalStore } from './local/local.store';
import { SessionStore } from './session/session.store';

export default angular.module('store', [])
    .service('localStore', LocalStore)
    .service('sessionStore', SessionStore);
