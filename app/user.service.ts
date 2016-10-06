import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";

@Injectable()
export class UserService {

    customerId: number;

    authApiUrl = "http://localhost:6606/authorization/customer/acquire-token/"; // VS
    contactCentreApiUrl = "http://localhost:5000/auth/customer/";

    twilioToken: string;

    constructor(private http: Http) {
    }

    authenticate(customerId: number, email: string, password: string) {
        this.customerId = customerId;

        let credentials = {userName: email, password: password};

        return this.http.post(this.authApiUrl, credentials).toPromise().then((response) => {
            var customerToken = response.text();
            console.log("got customer token from AuthApi");

            let headers = new Headers();
            headers.append("Authorization", customerToken);

            return this.http.post(this.contactCentreApiUrl, null, {headers: headers}).toPromise().then((response)=> {
                this.twilioToken = response.text();
            });
        });
    }
}