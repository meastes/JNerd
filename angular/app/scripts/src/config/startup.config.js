export default function startup(authService, $rootScope) {
    authService.updateAuthFromStore();
    $rootScope.$on('unauthorized', () => authService.deleteAuthData());
    $rootScope.$on('refresh', () => authService.refreshToken());
}

startup.$inject = ['authService', '$rootScope'];
