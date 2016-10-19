import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {AppSettings} from "./app.settings";

@Injectable()
export class UserService {

    customerId: number;

    authApiTokenRoute = AppSettings.authApiTokenRoute;
    contactCentreApiTokenRoute = AppSettings.contactCentreApi + "auth/customer/";

    customerToken:string;
    twilioToken: string;

    constructor(private http: Http) {
    }

    authenticate(customerId: number, email: string, password: string) {
        this.customerId = customerId;

        let credentials = {userName: email, password: password};

        return this.http.post(this.authApiTokenRoute, credentials).toPromise().then((response) => {
            this.customerToken = response.text();
            console.log("got customer token from AuthApi");

            let headers = new Headers();
            headers.append("Authorization", this.customerToken);

            return this.http.post(this.contactCentreApiTokenRoute, null, {headers: headers}).toPromise().then((response)=> {
                this.twilioToken = response.text();
            });
        });
    }

    loggedIn() {
        return this.customerId && this.twilioToken;
    }
}