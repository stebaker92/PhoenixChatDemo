import {Injectable} from '@angular/core'
import {Http, RequestOptions, Headers} from "@angular/http";

@Injectable()
export class ChatService {

    //typescript hack for jQuery // todo install jquery.d.ts (currently won't install)
    $: any;

    // Manages the state of our access token we got from the server
    accessManager;

    // Our interface to the IP Messaging service
    messagingClient;

    // A handle to the "general" chat channel - the one and only channel we
    // will have in this sample app
    currentChannel;


    // CONFIG
    customerId = "10000";
    channelName = "TestChannel";
    // END CONFIG

    apiUrl = "http://localhost:5000/auth/customer/"; //?identity=ste&device=mobile"
    taskRouterUrl = "https://fcbe0bc8.ngrok.io/tasks/";

    constructor(private http: Http) {
    }

    getMessagingClient() {
        return this.getAccessToken().then((token: any) => {
            console.log("creating Twilio manager with token : ");
            console.log(token);

            this.accessManager = new (<any>window).Twilio.AccessManager(token);
            this.messagingClient = new (<any>window).Twilio.IPMessaging.Client(this.accessManager);
            console.log("created Twilio manager");
            return this.messagingClient;
        });
    }

    getAccessToken() {

        let credentials = {userName: "stephen.baker@carfinance247.co.uk", password: "TEMP"};
        return this.http.post("http://localhost:54180/authorization/customer/acquire-token/", credentials).toPromise().then((response)=> {
            console.log("got response from auth api");
            console.log(response);

            let headers = new Headers();
            headers.append("Authorization", response.text());
            return this.http.post(this.apiUrl, null, {headers: headers})
                .toPromise()
                .then((response) => {
                    //return response.json().token;
                    console.log(response);
                    return response.text();
                })
                .catch((error)=> {
                    console.error("Error getting token");
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
                setTimeout(()=> {
                    resolve();
                }, 1000);
            });
            // let headers = new Headers({'Content-Type': 'application/json'});
            // let options = new RequestOptions({headers: headers});

            //return this.http.post("http://localhost:49365/token", JSON.stringify(model), options).toPromise();
            //return this.http.post(this.taskRouterUrl, JSON.stringify(model), options).toPromise();
        });
    }

    joinChannel(channelName) {
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
                    this.setupChannel();
                });
            } else {
                console.log('Joined existing channel');
                this.setupChannel();
            }
        });
    }

    setupChannel() {
        return this.currentChannel.join();
    }

}