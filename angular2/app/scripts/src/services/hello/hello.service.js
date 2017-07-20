import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ConfigService } from 'services/config/config.service';

/**
 * Simple service for retrieving a hello world message.
 */
@Injectable()
export class HelloService {

    _http: Http;
    _restBaseUrl: string;

    constructor(http: Http, configService: ConfigService) {
        this._http = http;
        this._restBaseUrl = configService.config.rest.baseUrl;
    }

    /**
     * Retrieves a message from the server.
     * @method helloWorld
     * @return {Observable}
     */
    get helloWorld() {
        return this._http.get(`${this._restBaseUrl}/api/hello/message`)
            .map(res => res.json().message);
    }

}
