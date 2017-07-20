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

    it('should display a message on successful registration', () => {
        $httpBackend
            .whenPOST(`${appConfig.rest.baseUrl}/api/user/register`)
            .respond(() => [201]);

        browser.get('#/');
        // Remove any existing user token
        browser.executeScript('window.localStorage.removeItem(\'jwtToken\');' +
                              'window.sessionStorage.removeItem(\'jwtToken\');');
        browser.get('#/register');

        element(by.name('username')).sendKeys('test');
        element(by.name('email')).sendKeys('test@test.com');
        element(by.name('password')).sendKeys('password');
        element(by.name('passwordVerify')).sendKeys('password');
        element(by.buttonText('Submit')).click();

        expect(element(by.name('registerForm')).$('[translate="register.success"]').isDisplayed());
    });

    it('should display an error on duplicate username', () => {
        $httpBackend
            .whenPOST(`${appConfig.rest.baseUrl}/api/user/register`)
            .respond(() => [400, { code: 'uniqueUsername' }]);

        browser.get('#/');
        // Remove any existing user token
        browser.executeScript('window.localStorage.removeItem(\'jwtToken\');' +
                              'window.sessionStorage.removeItem(\'jwtToken\');');
        browser.get('#/register');

        element(by.name('username')).sendKeys('test');
        element(by.name('email')).sendKeys('test@test.com');
        element(by.name('password')).sendKeys('password');
        element(by.name('passwordVerify')).sendKeys('password');
        element(by.buttonText('Submit')).click();

        expect(element(by.name('registerForm')).$('[ng-message="unique"]').isDisplayed());
    });

    it('should display an error on duplicate email', () => {
        $httpBackend
            .whenPOST(`${appConfig.rest.baseUrl}/api/user/register`)
            .respond(() => [400, { code: 'uniqueEmail' }]);

        browser.get('#/');
        // Remove any existing user token
        browser.executeScript('window.localStorage.removeItem(\'jwtToken\');' +
                              'window.sessionStorage.removeItem(\'jwtToken\');');
        browser.get('#/register');

        element(by.name('username')).sendKeys('test');
        element(by.name('email')).sendKeys('test@test.com');
        element(by.name('password')).sendKeys('password');
        element(by.name('passwordVerify')).sendKeys('password');
        element(by.buttonText('Submit')).click();

        expect(element(by.name('registerForm')).$('[ng-message="unique"]').isDisplayed());
    });

    it('should display an error when passwords don\'t match', () => {
        browser.get('#/');
        // Remove any existing user token
        browser.executeScript('window.localStorage.removeItem(\'jwtToken\');' +
                              'window.sessionStorage.removeItem(\'jwtToken\');');
        browser.get('#/register');

        element(by.name('username')).sendKeys('test');
        element(by.name('email')).sendKeys('test@test.com');
        element(by.name('password')).sendKeys('password');
        element(by.name('passwordVerify')).sendKeys('password2');
        element(by.buttonText('Submit')).click();

        expect(element(by.name('registerForm')).$('[ng-message="match"]').isDisplayed());
    });

    it('should display an error for a username over 50 characters', () => {
        browser.get('#/');
        // Remove any existing user token
        browser.executeScript('window.localStorage.removeItem(\'jwtToken\');' +
                              'window.sessionStorage.removeItem(\'jwtToken\');');
        browser.get('#/register');

        element(by.name('username')).sendKeys(
            'testing123testing123testing123testing123testing123testing123'
        );
        element(by.name('email')).sendKeys('test@test.com');
        element(by.name('password')).sendKeys('password');
        element(by.name('passwordVerify')).sendKeys('password');
        element(by.buttonText('Submit')).click();

        expect(element(by.name('registerForm')).$('[ng-message="md-maxlength"]').isDisplayed());
    });

    it('should display an error for an email over 100 characters', () => {
        browser.get('#/');
        // Remove any existing user token
        browser.executeScript('window.localStorage.removeItem(\'jwtToken\');' +
                              'window.sessionStorage.removeItem(\'jwtToken\');');
        browser.get('#/register');

        element(by.name('username')).sendKeys('test');
        element(by.name('email')).sendKeys('testing123testing123testing123testing123' +
            'testing123testing123testing123testing123testing123testing123@test.com');
        element(by.name('password')).sendKeys('password');
        element(by.name('passwordVerify')).sendKeys('password');
        element(by.buttonText('Submit')).click();

        expect(element(by.name('registerForm')).$('[ng-message="md-maxlength"]').isDisplayed());
    });

    it('should display an error if email is not a valid email address', () => {
        browser.get('#/');
        // Remove any existing user token
        browser.executeScript('window.localStorage.removeItem(\'jwtToken\');' +
                              'window.sessionStorage.removeItem(\'jwtToken\');');
        browser.get('#/register');

        element(by.name('username')).sendKeys('test');
        element(by.name('email')).sendKeys('test');
        element(by.name('password')).sendKeys('password');
        element(by.name('passwordVerify')).sendKeys('password');
        element(by.buttonText('Submit')).click();

        expect(element(by.name('registerForm')).$('[ng-message="pattern"]').isDisplayed());
    });

    it('should display an error if username is blank', () => {
        browser.get('#/');
        // Remove any existing user token
        browser.executeScript('window.localStorage.removeItem(\'jwtToken\');' +
                              'window.sessionStorage.removeItem(\'jwtToken\');');
        browser.get('#/register');

        element(by.name('email')).sendKeys('test@test.com');
        element(by.name('password')).sendKeys('password');
        element(by.name('passwordVerify')).sendKeys('password');
        element(by.buttonText('Submit')).click();

        expect(element(by.name('registerForm')).$('[ng-message="required"]').isDisplayed());
    });

    it('should display an error if email is blank', () => {
        browser.get('#/');
        // Remove any existing user token
        browser.executeScript('window.localStorage.removeItem(\'jwtToken\');' +
                              'window.sessionStorage.removeItem(\'jwtToken\');');
        browser.get('#/register');

        element(by.name('username')).sendKeys('test');
        element(by.name('password')).sendKeys('password');
        element(by.name('passwordVerify')).sendKeys('password');
        element(by.buttonText('Submit')).click();

        expect(element(by.name('registerForm')).$('[ng-message="required"]').isDisplayed());
    });
});
