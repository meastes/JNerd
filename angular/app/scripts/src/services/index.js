import angular from 'angular';

import { HelloService } from './hello/hello.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

export default angular.module('services', [])
    .service('helloService', HelloService)
    .service('authService', AuthService)
    .service('userService', UserService);
