/**
 * Service for retrieving and modifying user data.
 */
export class UserService {

    constructor($rootScope, $http, appConfig, authService) {
        this.$rootScope = $rootScope;
        this.$http = $http;
        this._authService = authService;

        // REST constants
        this._restBaseUrl = appConfig.rest.baseUrl;
    }

    /**
     * Authenticate user credentials.
     * @method authenticate
     * @param  {string}  username Username
     * @param  {string}  password Password
     * @param  {boolean} rememberMe True to remember user credentials
     * @return {Promise}
     */
    authenticate(username, password, rememberMe) {
        if (username && password) {
            return this.$http.post(`${this._restBaseUrl}/api/user/login`,
                { username, password, remember: rememberMe })
                .then(res => this._authService.updateAuthWithToken(res.data.token, rememberMe));
        }

        return Promise.reject('Missing username or password');
    }

    /**
     * Logout a user.
     * @method logout
     * @return {Promise}
     */
    logout() {
        this._authService.deleteAuthData();
        return Promise.resolve();
    }

    /**
     * Register a user
     * @method register
     * @param  {User} user User to register
     * @return {Promise}
     */
    register(user) {
        return this.$http.post(`${this._restBaseUrl}/api/user/register`, user);
    }

    /**
     * Activate a user
     * @method activate
     * @param  {string} key Activation key
     * @return {Promise}
     */
    activate(key) {
        return this.$http.post(`${this._restBaseUrl}/api/user/activate`, key,
            { headers: { 'Content-Type': 'text/plain' },
        });
    }

    /**
     * Resends an activation email.
     * @method resendActivation
     * @param  {string} username Username to resend the email to
     * @return {Promise}
     */
    resendActivation(username) {
        return this.$http.post(`${this._restBaseUrl}/api/user/resend-activation`, username,
            { headers: { 'Content-Type': 'text/plain' },
        });
    }

    /**
     * Send a reset password email.
     * @method sendResetPassword
     * @param  {string} username Username to send a reset password email to
     * @return {Promise}
     */
    sendResetPassword(username) {
        return this.$http.post(`${this._restBaseUrl}/api/user/send-reset-password`, username,
            { headers: { 'Content-Type': 'text/plain' },
        });
    }

    /**
     * Changes a user's password.
     * @method resetPassword
     * @param  {string} resetKey The password reset key
     * @param  {string} password The new password
     */
    resetPassword(resetKey, password) {
        return this.$http.post(`${this._restBaseUrl}/api/user/reset-password`, {
            resetKey,
            password,
        });
    }

}

UserService.$inject = ['$rootScope', '$http', 'appConfig', 'authService'];
