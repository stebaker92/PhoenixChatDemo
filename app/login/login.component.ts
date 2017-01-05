import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
    selector: 'my-car-detail',
    templateUrl: 'app/login/login.component.html'
})
export class LoginComponent {

    username: string;
    password: string;

    users: any[];
    selectedUser: any;

    constructor(private router: Router, private userService: UserService) {
        this.users = [
            {customerId: 1059608, customerUserId: 331697, email: 'stephen.baker@carfinance247.co.uk', password: ''},
            {customerId: 1059609, customerUserId: null, email: 'fredperry9@hotmail.com', password: ''}
        ];
    }

    login() {
        this.userService.authenticate(this.selectedUser.customerUserId, this.selectedUser.email, this.selectedUser.password).then(() => {
            this.router.navigate(['/list']);
        });
    }
}