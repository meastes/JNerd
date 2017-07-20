/* global describe beforeEach afterEach it expect input element by browser */
import HttpBackend from 'httpbackend';
import appConfig from '../../app/scripts/src/config/dist/application.config.json';

describe('Login', () => {
    let $httpBackend;
    beforeEach(() => {
        $httpBackend = new HttpBackend(browser);
        // Allow local resources
        $httpBackend.whenGET(/scripts\/src/).passThrough();
    });
    afterEach(() => $httpBackend.clear());

    it('should redirect home on successful login', () => {
        $httpBackend
            .whenPOST(`${appConfig.rest.baseUrl}/api/user/login`)
            .respond({ token: 'asd123' });

        browser.get('#/');
        // Remove any existing user token
        browser.executeScript('window.localStorage.removeItem(\'jwtToken\');' +
                              'window.sessionStorage.removeItem(\'jwtToken\');');
        browser.get('#/login');

        element(by.name('username')).sendKeys('test');
        element(by.name('password')).sendKeys('password');
        element(by.buttonText('Submit')).click();

        expect(browser.getLocationAbsUrl()).toBe('/');
    });

    it('should display an error on bad login', () => {
        $httpBackend
            .whenPOST(`${appConfig.rest.baseUrl}/api/user/login`)
            .respond(() => [400, { code: 'loginValid' }]);

        browser.get('#/');
        // Remove any existing user token
        browser.executeScript('window.localStorage.removeItem(\'jwtToken\');' +
                              'window.sessionStorage.removeItem(\'jwtToken\');');
        browser.get('#/login');

        element(by.name('username')).sendKeys('test');
        element(by.name('password')).sendKeys('password');
        element(by.buttonText('Submit')).click();

        expect(element(by.name('loginForm')).$('[ng-message="loginValid"]').isDisplayed());
    });

    it('should display an error on for an unactivated user', () => {
        $httpBackend
            .whenPOST(`${appConfig.rest.baseUrl}/api/user/login`)
            .respond(() => [400, { code: 'activated' }]);

        browser.get('#/');
        // Remove any existing user token
        browser.executeScript('window.localStorage.removeItem(\'jwtToken\');' +
                              'window.sessionStorage.removeItem(\'jwtToken\');');
        browser.get('#/login');

        element(by.name('username')).sendKeys('test');
        element(by.name('password')).sendKeys('password');
        element(by.buttonText('Submit')).click();

        expect(element(by.name('loginForm')).$('[ng-message="activated"]').isDisplayed());
    });
});
