import {Routes}  from '@angular/router';
import {CarDetailComponent} from './car-detail/car-detail.component';
import {LoginComponent} from "./login/login.component";
import {CarListComponent} from "./car-list/car-list.component";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
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

export const appRoutes = routes;
