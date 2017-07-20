import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ConfigService } from 'services/config/config.service';
import { AuthService } from 'services/auth/auth.service';

/**
 * Service for retrieving and modifying user data.
 */
@Injectable()
export class UserService {

    _restBaseUrl: string;
    _http: Http;
    _authService: AuthService;

    constructor(http: Http, configService: ConfigService, authService: AuthService) {
        this._http = http;
        this._restBaseUrl = configService.config.rest.baseUrl;
        this._authService = authService;
    }

    /**
     * Authenicates user credentials.
     * @method authenticate
     * @param  {string}     username Username
     * @param  {string}     password Password
     * @param  {boolean}    remember True to remember user credentials
     * @return {Observable}
     */
    authenticate(username, password, remember) {
        if (username && password) {
            return this._http.post(
                `${this._restBaseUrl}/api/user/login`,
                JSON.stringify({ username, password, remember }),
            ).map(res => res.json().token);
        }

        throw new Error('Missing username or password');
    }

    /**
     * Logs the user out.
     * @method logout
     */
    logout() {
        this._authService.deleteAuthData();
    }

    /**
     * Registers the user.
     * @method register
     * @param  {string}     username Username
     * @param  {string}     email    Email address
     * @param  {password}   password Password
     * @return {Observable}
     */
    register(username, email, password) {
        return this._http.post(
            `${this._restBaseUrl}/api/user/register`,
            JSON.stringify({ username, email, password }),
        ).map(res => res.json().token);
    }

    /**
     * Activates a user based on an activation key.
     * @method activate
     * @param  {string} key Activation key
     * @return {Observable}
     */
    activate(key) {
        return this._http.post(`${this._restBaseUrl}/api/user/activate`, key,
            { headers: { 'Content-Type': 'text/plain' },
        });
    }

    /**
     * Resends an activation email.
     * @method resendActivation
     * @param  {string}     username Username
     * @return {Observable}
     */
    resendActivation(username) {
        return this._http.post(`${this._restBaseUrl}/api/user/resend-activation`, username,
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
        return this._http.post(`${this._restBaseUrl}/api/user/send-reset-password`, username,
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
        return this._http.post(`${this._restBaseUrl}/api/user/reset-password`, JSON.stringify({
            resetKey,
            password,
        }));
    }

}
