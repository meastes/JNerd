export default function themeConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('cyan', { default: '800' })
        .accentPalette('teal', { default: '500' });
}

themeConfig.$inject = ['$mdThemingProvider'];
