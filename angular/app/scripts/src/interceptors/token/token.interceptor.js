// Angular interceptors lose the 'this' context, so we have to set it ourselves
let self;

/**
 * Interceptor to update authentication based on web service 401 responses.
 */
export class TokenInterceptor {
    constructor($q, $rootScope) {
        self = this;
        this.$q = $q;
        this.$rootScope = $rootScope;
    }

    /**
     * On a good response from the web service, refresh the auth token.
     * @method response
     * @param  {Response} res Server response
     * @return {Response}
     */
    response(res) {
        // If the response from a REST call is good, also refresh the token
        if (res.config.headers.Authorization &&
            res.status === 200 &&
            res.headers()['content-type'].includes('application/json') &&
            // Ignore requests to the refresh service
            !res.config.url.includes('/api/user/refresh')) {
            // Refresh event will be picked up in the startup config
            self.$rootScope.$emit('refresh');
        }
        return res;
    }

    /**
     * If we receive a 401 error, there was an authentication failire - log the user out.
     * @method responseError
     * @param  {Reject} reject Rejected response
     * @return {Reject}
     */
    responseError(reject) {
        if (reject.status === 401) {
            // Unauthorized event will be picked up in the startup config
            self.$rootScope.$emit('unauthorized');
        }
        return self.$q.reject(reject);
    }
}
