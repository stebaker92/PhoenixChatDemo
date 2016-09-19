import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";

@Injectable()
export class ChatService {

    //typescript hack for jQuery // todo install jquery.d.ts (currently won't install)
    //$: any;

    // Manages the state of our access token we got from the server
    accessManager;

    // Our interface to the Twilio IP Messaging service
    messagingClient;

    // A handle to the customers chat channel - the one and only channel we need in this sample app
    currentChannel;

    // Our interface to the Twilio Sync service
    syncClient;

    // CONFIG
    customerId = "1059608"; // 'Test Customer'
    channelName = "customer:" + this.customerId;
    customerEmail = "stephen.baker@carfinance247.co.uk";
    customerPassword = "TEMP";
    // END CONFIG


    contactCentreApiUrl = "http://localhost:6605/auth/customer/";
    authApiUrl = "http://localhost:6606/authorization/customer/acquire-token/"; // VS
    //taskRouterUrl = "https://fcbe0bc8.ngrok.io/tasks/";

    constructor(private http: Http) {
        this.getAccessTokens().then((twilioToken: any) => {
            console.log("creating Twilio manager");

            this.accessManager = new (<any>window).Twilio.AccessManager(twilioToken);
            this.messagingClient = new (<any>window).Twilio.IPMessaging.Client(this.accessManager);
            this.syncClient = new (<any>window).Twilio.Sync.Client(this.accessManager);

            console.log("created Twilio manager");
        });
    }

    getMessagingClient() {
        return this.messagingClient;
    }

    getAccessTokens() {

        let credentials = {userName: this.customerEmail, password: this.customerPassword};
        return this.http.post(this.authApiUrl, credentials).toPromise().then((response) => {
            console.log("got customer token from AuthApi");
            console.log(response);

            let headers = new Headers();
            headers.append("Authorization", response.text());
            return this.http.post(this.contactCentreApiUrl, null, {headers: headers})
                .toPromise()
                .then((response) => {
                    //return response.json().token;
                    console.log(response);
                    return response.text();
                })
                .catch((error) => {
                    console.error("Error getting customerTwilioToken");
                    console.error(error);
                })
                ;
        });
    }

    joinThenCreateTask(user, car) {

        //return this.joinChannel(user).then(() => {
        return this.joinChannel(this.channelName).then(() => {
            var model = {
                attributes: '{"customer_location": "car-search", "car_name": "' + car.name + '", "username": "' + user + '"}',
                workflowSid: "WW9bdbf175bd2a6133c63caf4145315acc",
            };
            return new Promise((resolve)=> {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });

            //TODO create a task
            // let headers = new Headers({'Content-Type': 'application/json'});
            // let options = new RequestOptions({headers: headers});

            //return this.http.post("http://localhost:49365/token", JSON.stringify(model), options).toPromise();
            //return this.http.post(this.taskRouterUrl, JSON.stringify(model), options).toPromise();
        });
    }

    joinChannel(channelName: string) {
        console.log('Attempting to join "' + channelName + '" chat channel...');
        // Get the custom chat channel
        var promise = this.messagingClient.getChannelByUniqueName(channelName);
        return promise.then((channel) => {
            this.currentChannel = channel;
            if (!this.currentChannel) {
                // If it doesn't exist, let's create it
                this.messagingClient.createChannel({
                    uniqueName: channelName,
                    friendlyName: channelName
                }).then((channel) => {
                    console.log('Created "' + channelName + '" channel:');
                    this.currentChannel = channel;
                    return this.currentChannel.join();
                });
            } else {
                console.log('Joining existing channel');
                return this.currentChannel.join();
            }
        });
    }

}