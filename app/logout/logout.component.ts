import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {SyncService} from "../sync.service";

@Component({
    selector: 'logout',
    templateUrl: 'app/logout/logout.component.html'
})
export class LogoutComponent implements OnInit {

    constructor(private router: Router, private syncService: SyncService, private userService: UserService) {
    }

    ngOnInit() {
        this.userService.customerUserId = null;
        this.userService.twilioToken = null;
        this.userService.customerToken = null;
        this.syncService.shutdown();

        this.router.navigate(['/login']);
    }
}