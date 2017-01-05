import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {AppSettings} from "./app.settings";

@Injectable()
export class UserService {

    customerUserId: number;

    authApiTokenRoute = AppSettings.authApiTokenRoute;
    contactCentreApiTokenRoute = AppSettings.contactCentreApi + "auth/customer/";

    customerToken: any;
    twilioToken: string;

    constructor(private http: Http) {
    }

    authenticate(customerUserId: number, email: string, password: string) {
        this.customerUserId = customerUserId;

        let credentials = {userName: email, password: 'indigohome67', clientId: 'mobile', accessType: 3};

        return this.http.post(this.authApiTokenRoute, credentials).toPromise().then((response) => {
            this.customerToken = response.json();
            console.log("got customer token from AuthApi", this.customerToken.authenticationToken);

            let headers = new Headers();
            headers.append("Authorization", this.customerToken.authenticationToken);

            return this.http.post(this.contactCentreApiTokenRoute, null, {headers: headers}).toPromise().then((response) => {
                this.twilioToken = response.text();
                console.log("got twilio token");
            });
        });
    }

    loggedIn() {
        return this.customerUserId && this.twilioToken;
    }
}