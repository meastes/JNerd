import angular from 'angular';

import NavigationComponent from './navigation/navigation.component';
import LoginComponent from './login/login.component';
import RegisterComponent from './register/register.component';
import ActivateAccountComponent from './activateAccount/activate-account.component';
import ResetPasswordComponent from './resetPassword/reset-password.component';
import HelloWorldComponent from './helloWorld/hello-world.component';

export default angular.module('components', [])
    .component('nrdNavigation', NavigationComponent)
    .component('nrdLogin', LoginComponent)
    .component('nrdRegister', RegisterComponent)
    .component('nrdActivateAccount', ActivateAccountComponent)
    .component('nrdResetPassword', ResetPasswordComponent)
    .component('nrdHelloWorld', HelloWorldComponent);
