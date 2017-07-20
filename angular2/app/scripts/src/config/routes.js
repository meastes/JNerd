import { IndexViewComponent } from 'components/views/index/index-view.component';
import { LoginViewComponent } from 'components/views/login/login-view.component';
import { RegisterViewComponent } from 'components/views/register/register-view.component';
import { ActivateViewComponent } from 'components/views/activate/activate-view.component';
import { ResetViewComponent } from 'components/views/reset/reset-view.component';

export default [
    {
        path: '/',
        name: 'index',
        component: IndexViewComponent,
        useAsDefault: true,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginViewComponent,
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterViewComponent,
    },
    {
        path: '/activate/:key',
        name: 'activate',
        component: ActivateViewComponent,
    },
    {
        path: '/reset/:key',
        name: 'reset',
        component: ResetViewComponent,
    },
];
