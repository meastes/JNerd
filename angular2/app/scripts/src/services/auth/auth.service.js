import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from 'services/config/config.service';
import { LocalStore } from 'stores/local/local.store';
import { SessionStore } from 'stores/session/session.store';

const KEY_JWT_TOKEN = 'jwtToken';

/**
 * Service to handle authentication checks and operations.
 */
@Injectable()
export class AuthService {

    token: string;
    authenticated: boolean = false;
    _restBaseUrl: string;
    _localStore: LocalStore;
    _sessionStore = SessionStore;

    constructor(configService: ConfigService,
                localStore: LocalStore,
                sessionStore: SessionStore) {
        this._restBaseUrl = configService.config.rest.baseUrl;
        this._localStore = localStore;
        this._sessionStore = sessionStore;
    }

    /**
     * Updates authenication with data from local/session store.
     * @method updateAuthFromStore
     * @return {string} Auth token from the store
     */
    updateAuthFromStore() {
        const token = this._sessionStore.get(KEY_JWT_TOKEN) || this._localStore.get(KEY_JWT_TOKEN);
        if (token) {
            this.updateAuthWithToken(token);
        }
        return token;
    }

    /**
     * Stores auth token and sets user as authenticated.
     * @method updateAuthWithToken
     * @param  {string}  token      Auth token
     * @param  {boolean} rememberMe True to remember user credentials
     * @return {Observable}
     */
    updateAuthWithToken(token, rememberMe) {
        this.token = token;
        this.authenticated = true;

        if (rememberMe) {
            this._localStore.set(KEY_JWT_TOKEN, token);
        } else {
            this._sessionStore.set(KEY_JWT_TOKEN, token);
        }

        return Observable.empty();
    }

    /**
     * Gets the content for the Authorization HTTP header.
     * @method authHeader
     * @return {string}
     */
    get authHeader() {
        if (this.token) {
            return `Bearer ${this.token}`;
        }
        return null;
    }

    /**
     * Delete all authentication data.
     * @method deleteAuthData
     * @return {Observable}
     */
    deleteAuthData() {
        this.token = null;
        this.authenticated = false;
        this._localStore.delete(KEY_JWT_TOKEN);
        this._sessionStore.delete(KEY_JWT_TOKEN);

        return Observable.empty();
    }

}
