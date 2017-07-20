import { ConfigService } from 'services/config/config.service';
import { HelloService } from 'services/hello/hello.service';
import { AuthService } from 'services/auth/auth.service';
import { UserService } from 'services/user/user.service';

export default [
    ConfigService,
    HelloService,
    AuthService,
    UserService,
];
