import {provideRouter, RouterConfig}  from '@angular/router';

import {CarDetailComponent} from './car-detail.component';
import {LoginComponent} from "./login.component";
import {CarListComponent} from "./car-list/car-list.component";
import {LogoutComponent} from "./logout/logout.component";

const routes: RouterConfig = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: CarListComponent
    },
    {
        path: 'detail/:id',
        component: CarDetailComponent
    }
];

export const appRouterProviders = [
    provideRouter(routes)
];
