// Shims
import 'zone.js';
import 'reflect-metadata';
import 'rxjs/Rx';

import { provide } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS, Http, RequestOptions, XHRBackend } from '@angular/http';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';

import services from 'services/services.inject';
import stores from 'stores/stores.inject';

import { AppComponent } from 'components/app/app.component';
import { NrdHttp } from 'angular-nrd/http/nrd-http';
import { AuthService } from 'services/auth/auth.service';
import { ConfigService } from 'services/config/config.service';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    services,
    stores,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    // Setup custom Http object for interceptors and custom headers
    provide(Http, {
        useFactory: (xhrBackend: XHRBackend,
                     requestOptions: RequestOptions,
                     configService : ConfigService,
                     authService: AuthService) =>
                     new NrdHttp(xhrBackend, requestOptions, configService, authService),
        deps: [XHRBackend, RequestOptions, ConfigService, AuthService],
    }),
]);
