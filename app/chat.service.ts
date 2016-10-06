import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {SyncService} from "./sync.service";

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

    channelName: string;

    customerId: number;

    constructor(private http: Http, private userService: UserService, private router: Router, private syncService: SyncService) {
    }

    setupTwilio(context) {

        // TODO implement localStorage for tokens
        if (!this.userService.twilioToken) {
            this.router.navigate(['/login']);
            return;
        }

        this.customerId = this.userService.customerId;
        this.channelName = "customer:" + this.customerId;

        console.log("creating Twilio manager");

        this.accessManager = new (<any>window).Twilio.AccessManager(this.userService.twilioToken);
        this.messagingClient = new (<any>window).Twilio.IPMessaging.Client(this.accessManager);

        this.syncService.setup(this.accessManager);

        this.syncService.updateContext(context);

        console.log("created Twilio manager");
    }

    getMessagingClient() {
        return this.messagingClient;
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

    sendFile(file: File) {
        var data = {};
        let formData = new FormData();
        formData.append("file", file, file.name);

        this.http.post("http://localhost:60646/documents", formData).toPromise().then((response: any)=> {
            var documentId = response.json();

            var documentAttributes = {
                documentId: documentId,
                filename: file.name
            };
            this.currentChannel.sendMessage(JSON.stringify(documentAttributes), {
                CustomerId: this.customerId,
                MessageTypeId: 2 // DOCUMENT
            });

            return documentId;
        });
    }
}