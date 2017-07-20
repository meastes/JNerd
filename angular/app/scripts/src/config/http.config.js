export default function httpConfig($httpProvider) {
    $httpProvider.interceptors.push('tokenInterceptor');
}

httpConfig.$inject = ['$httpProvider'];
