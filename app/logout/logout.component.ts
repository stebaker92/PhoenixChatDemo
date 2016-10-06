import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {SyncService} from "../sync.service";

@Component({
    selector: 'logout',
    templateUrl: 'app/logout/logout.component.html',
    directives: []
})
export class LogoutComponent implements OnInit {

    constructor(private router: Router, private syncService: SyncService, private userService: UserService) {
    }

    ngOnInit() {
        this.userService.customerId = null;
        this.syncService.shutdown();

        window.setTimeout(()=> {
            this.router.navigate(['/login']);
        }, 3000);
    }
}