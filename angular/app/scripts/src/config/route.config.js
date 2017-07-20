export default function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('index', {
        url: '/',
        templateUrl: 'scripts/src/views/index/index.view.html',
        controller: 'indexView',
    })
    .state('login', {
        url: '/login',
        templateUrl: 'scripts/src/views/login/login.view.html',
        controller: 'loginView',
    })
    .state('register', {
        url: '/register',
        templateUrl: 'scripts/src/views/register/register.view.html',
        controller: 'registerView',
    })
    .state('activate', {
        url: '/activate/:key',
        templateUrl: 'scripts/src/views/activate/activate.view.html',
        controller: 'activateView',
    })
    .state('reset', {
        url: '/reset/:key',
        templateUrl: 'scripts/src/views/reset/reset.view.html',
        controller: 'resetView',
    });
    $urlRouterProvider.otherwise('/');
}

routes.$inject = ['$stateProvider', '$urlRouterProvider'];
