import { Injectable } from '@angular/core';

import config from 'config/dist/application.config.json';

/**
 * Service for retrieving config settings.
 */
@Injectable()
export class ConfigService {
    constructor() {
        this._config = config;
    }
    get config() {
        return this._config;
    }
}
