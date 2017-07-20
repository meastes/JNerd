const KEY_JWT_TOKEN = 'jwtToken';

/**
 * Service for handling authentication.
 */
export class AuthService {

    constructor($rootScope, $http, localStore, sessionStore, appConfig) {
        this.$rootScope = $rootScope;
        this.$http = $http;
        this._localStore = localStore;
        this._sessionStore = sessionStore;

        // REST constants
        this._restBaseUrl = appConfig.rest.baseUrl;
    }

    /**
     * Updates authentication from data in the store.
     * @method updateAuthFromStore
     * @return {string} Current auth token
     */
    updateAuthFromStore() {
        const token = this._sessionStore.get(KEY_JWT_TOKEN) || this._localStore.get(KEY_JWT_TOKEN);
        if (token) {
            this.updateAuthWithToken(token);
        }
        return token;
    }

    /**
     * Updates authentication with an auth token.
     * @method updateAuthWithToken
     * @param  {string}  token Auth token
     * @param  {boolean} rememberMe True to remember the credentials
     */
    updateAuthWithToken(token, rememberMe) {
        this.$rootScope.token = token;
        this.$rootScope.authenticated = true;
        this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;

        if (rememberMe) {
            this._localStore.set(KEY_JWT_TOKEN, token);
        } else {
            this._sessionStore.set(KEY_JWT_TOKEN, token);
        }
    }

    /**
     * Requests an updated auth token from the server.
     * @method refreshToken
     * @return {Promise}
     */
    refreshToken() {
        return this.$http.get(`${this._restBaseUrl}/api/user/refresh`)
            .then(res => this.updateAuthWithToken(res.data.token, false));
    }

    /**
     * Remove all authentication data.
     * @method deleteAuthData
     */
    deleteAuthData() {
        this.$rootScope.token = null;
        this.$rootScope.authenticated = false;
        this.$http.defaults.headers.common.Authorization = '';
        this._localStore.delete(KEY_JWT_TOKEN);
        this._sessionStore.delete(KEY_JWT_TOKEN);
    }

}

AuthService.$inject = ['$rootScope', '$http', 'localStore', 'sessionStore', 'appConfig'];
