import appConfig from './dist/application.config.json';

export default function translateConfig($translateProvider) {
    $translateProvider.useUrlLoader(`${appConfig.rest.baseUrl}/api/translate/list`);
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.useMissingTranslationHandlerLog();
}

translateConfig.$inject = ['$translateProvider'];
