import { ConnectionBackend, Http, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from 'services/auth/auth.service';
import { ConfigService } from 'services/config/config.service';

/**
 * Http subclass to add interceptors and custom headers to all requests.
 */
export class NrdHttp extends Http {

    authHeader: string = '';
    _authService: AuthService;

    constructor(backend: ConnectionBackend,
                defaultOptions: RequestOptions,
                configService: ConfigService,
                authService: AuthService) {
        super(backend, defaultOptions);
        this._restBaseUrl = configService.config.rest.baseUrl;
        this._authService = authService;
    }
    request(url: string, options: RequestOptionsArgs) {
        return this.intercept(super.request(url, this.getOptionsWithUpdatedHeaders(options)));
    }
    get(url: string, options: RequestOptionsArgs) {
        return this.intercept(super.get(url, this.getOptionsWithUpdatedHeaders(options)));
    }
    post(url: string, body: string, options: RequestOptionsArgs) {
        return this.intercept(super.post(url, body, this.getOptionsWithUpdatedHeaders(options)));
    }
    put(url: string, body: string, options: RequestOptionsArgs) {
        return this.intercept(super.put(url, body, this.getOptionsWithUpdatedHeaders(options)));
    }
    delete(url: string, options: RequestOptionsArgs) {
        return this.intercept(super.delete(url, this.getOptionsWithUpdatedHeaders(options)));
    }
    patch(url: string, body: string, options: RequestOptionsArgs) {
        return this.intercept(super.patch(url, body, this.getOptionsWithUpdatedHeaders(options)));
    }
    head(url: string, options: RequestOptionsArgs) {
        return this.intercept(super.head(url, this.getOptionsWithUpdatedHeaders(options)));
    }

    /**
     * Adds custom headers to request options.
     * @method getOptionsWithUpdatedHeaders
     * @param  {RequestOptionsArgs} options Request options to update
     * @return {RequestOptionsArgs}
     */
    getOptionsWithUpdatedHeaders(options: RequestOptionsArgs) {
        let updatedOptions = options;
        if (!updatedOptions) {
            updatedOptions = { headers: {} };
        }

        if (!updatedOptions.headers.Authorization) {
            updatedOptions.headers.Authorization = this._authService.authHeader;
        }
        if (!updatedOptions.headers['Content-Type']) {
            updatedOptions.headers['Content-Type'] = 'application/json';
        }
        return updatedOptions;
    }

    /**
     * Applies interceptors to a request.
     * @method intercept
     * @param  {Observable} observable Observable returned from a request
     * @return {Observable} Observable with interceptors applied
     */
    intercept(observable: Observable) {
        // 401 means we've been logged out, so delete stored auth data
        const interceptedObservable = observable.catch(err => {
            if (err.status === 401) {
                this._authService.deleteAuthData();
            }
            return Observable.throw(err);
        });

        // Successful REST calls should refresh our token duration
        interceptedObservable.subscribe(response => {
            if (response.headers.get('Content-Type').includes('application/json') &&
                !response.url.includes('/api/user/refresh')) {
                this.get(`${this._restBaseUrl}/api/user/refresh`)
                    .map(res => res.json().token)
                    .subscribe(token => this._authService.updateAuthWithToken(token, false));
            }
        });

        return interceptedObservable;
    }

}
