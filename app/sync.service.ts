import {Injectable} from "@angular/core";
import {UserService} from "./user.service";

@Injectable()
export class SyncService {

    // Our interface to the Twilio Sync service
    syncClient;

    constructor(private userService: UserService) {
    }

    setup(accessManager) {
        this.syncClient = new (<any>window).Twilio.Sync.Client(accessManager);
    }

    getCustomerDocument() {
        var customerId = this.userService.customerId;

        return this.syncClient.document('Customer:' + customerId);
    }

    updateContext(context: string) {
        if (!this.syncClient) {
            return;
        }
        console.log("updating context to", context);
        this.getCustomerDocument().then((document) => {
            document.update({
                context: context
            });
        });
    }
}