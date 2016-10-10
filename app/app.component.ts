import {Component}          from '@angular/core';
import {ROUTER_DIRECTIVES, Router}  from '@angular/router';
import {CarService}        from './car.service';
import {ChatService}        from './chat.service';
import './rxjs-extensions';
import {FileService} from "./file-service";
import {UserService} from "./user.service";
import {SyncService} from "./sync.service";
import {ChatComponent} from "./chat.component";

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav *ngIf="loggedIn()">
      <a [routerLink]="['/list']" routerLinkActive="active">Cars</a>
      <a [routerLink]="['/logout']" routerLinkActive="active">Logout</a>
    </nav>
    <div *ngIf="loggedIn()">
        <chat></chat>
    </div>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, ChatComponent],
    providers: [
        CarService, ChatService, FileService, UserService, SyncService
    ]
})
export class AppComponent {
    title = 'Phoenix Customer Demo';

    constructor(private router: Router, private userService: UserService) {
        this.router.navigateByUrl('login');
    }

    loggedIn() {
        return this.userService.loggedIn();
    }
}
