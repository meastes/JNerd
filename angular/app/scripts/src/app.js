import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import 'angular-mocks'; // For unit/e2e tests

import themeConfig from './config/theme.config';
import httpConfig from './config/http.config';
import routeConfig from './config/route.config';
import appConfig from './config/dist/application.config.json';
import startupScript from './config/startup.config';

import components from './components';
import interceptors from './interceptors';
import services from './services';
import stores from './stores';
import views from './views';

angular
    .module('jnerdApp', [
        uiRouter,
        ngMaterial,
        ngMessages,
        components.name,
        interceptors.name,
        services.name,
        stores.name,
        views.name,
    ])
    .config(themeConfig)
    .config(routeConfig)
    .config(httpConfig)
    .value('appConfig', appConfig)
    .run(startupScript);
