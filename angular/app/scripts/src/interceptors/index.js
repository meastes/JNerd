import angular from 'angular';

import { TokenInterceptor } from './token/token.interceptor';

export default angular.module('interceptors', [])
    .factory('tokenInterceptor', ['$q', '$rootScope',
                                  ($q, $rootScope) => new TokenInterceptor($q, $rootScope)]);
