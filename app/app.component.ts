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
    templateUrl: "app/app.component.html",
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, ChatComponent],
    providers: [
        CarService, ChatService, FileService, UserService, SyncService
    ]
})
export class AppComponent {
    title = 'Phoenix Customer Demo';

    constructor(private router: Router, private userService: UserService) {
        if (!this.loggedIn()) {
            this.router.navigate(['login']);
        }
    }

    loggedIn() {
        return this.userService.loggedIn();
    }
}
