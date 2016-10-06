import {Component}          from '@angular/core';
import {ROUTER_DIRECTIVES, Router}  from '@angular/router';
import {CarService}        from './car.service';
import {ChatService}        from './chat.service';
import './rxjs-extensions';
import {FileService} from "./file-service";
import {UserService} from "./user.service";
@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
      <!--<a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>-->
      <!--<a [routerLink]="['/cars']" routerLinkActive="active">Cars</a>-->
    </nav>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        CarService, ChatService, FileService, UserService
    ]
})
export class AppComponent {
    title = 'Phoenix Customer Demo';

    constructor(private router: Router) {
        this.router.navigateByUrl('login');
    }
}
