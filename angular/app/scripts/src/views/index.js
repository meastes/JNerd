import angular from 'angular';

import { IndexView } from './index/index.view';
import { LoginView } from './login/login.view';
import { RegisterView } from './register/register.view';
import { ActivateView } from './activate/activate.view';
import { ResetView } from './reset/reset.view';

export default angular.module('views', [])
    .controller('indexView', IndexView)
    .controller('loginView', LoginView)
    .controller('registerView', RegisterView)
    .controller('activateView', ActivateView)
    .controller('resetView', ResetView);
