import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {AppSettings} from "./app.settings";
import {Http, Headers} from "@angular/http";

@Injectable()
export class SyncService {

    // Our interface to the Twilio Sync service
    syncClient;

    contextApiRoute = AppSettings.contactCentreApi + "sync/context/";

    constructor(private http: Http, private userService: UserService) {
    }

    initialize(accessManager) {
        console.log("Setting up sync");
        this.syncClient = new (<any>window).Twilio.Sync.Client(accessManager);
    }

    updateContext(context: string) {
        console.log("updating context to", context);

        let headers = new Headers();
        headers.append("Authorization", this.userService.customerToken.authenticationToken);

        return this.http.post(this.contextApiRoute + "?context=" + context, null, {headers: headers}).toPromise().then(() => {
            console.log("context updated");
        });
    }

    shutdown() {
        if (this.syncClient) {
            this.syncClient.shutdown();
        }
    }
}