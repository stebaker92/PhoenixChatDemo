import {provideRouter, RouterConfig}  from '@angular/router';

import {CarDetailComponent} from './car-detail.component';
import {LoginComponent} from "./login.component";
import {CarListComponent} from "./car-list/car-list.component";

const routes: RouterConfig = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/detail/11',
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
