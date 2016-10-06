import {Component}          from '@angular/core';
import {ROUTER_DIRECTIVES, Router}  from '@angular/router';
import {CarService}        from './car.service';
import {ChatService}        from './chat.service';
import './rxjs-extensions';
import {FileService} from "./file-service";
import {UserService} from "./user.service";
import {SyncService} from "./sync.service";

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['/list']" routerLinkActive="active">Cars</a>
      <a [routerLink]="['/logout']" routerLinkActive="active">Logout</a>
    </nav>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        CarService, ChatService, FileService, UserService, SyncService
    ]
})
export class AppComponent {
    title = 'Phoenix Customer Demo';

    constructor(private router: Router) {
        this.router.navigateByUrl('login');
    }
}
