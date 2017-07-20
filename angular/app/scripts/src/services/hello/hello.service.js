/**
 * Service to retrieve a message from the server.
 */
export class HelloService {

    constructor($http, appConfig) {
        this.$http = $http;

        // REST constants
        this._restBaseUrl = appConfig.rest.baseUrl;
    }

    /**
     * Receive a message from the server.
     * @method getMessage
     * @return {Promise}
     */
    getMessage() {
        return this.$http.get(`${this._restBaseUrl}/api/hello/message`)
            .then(json => json.data.message);
    }

}

HelloService.$inject = ['$http', 'appConfig'];
