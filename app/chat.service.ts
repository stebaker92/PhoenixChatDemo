import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {SyncService} from "./sync.service";
import {FileService} from "./file.service";
import {MessageAttributes} from "./models/message";

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

    // Channel name should be: "Customer:123" where 123 is the customerUserId
    channelName: string;

    customerUserId: number;

    constructor(private userService: UserService, private router: Router, private syncService: SyncService, private fileService: FileService) {
    }

    setupTwilio() {

        // TODO implement localStorage for tokens
        if (!this.userService.twilioToken) {
            this.router.navigate(['/login']);
            return;
        }

        this.customerUserId = this.userService.customerUserId;
        this.channelName = "customer:" + this.customerUserId;

        console.log("creating Twilio manager");

        this.accessManager = new (<any>window).Twilio.AccessManager(this.userService.twilioToken);
        this.messagingClient = new (<any>window).Twilio.IPMessaging.Client(this.accessManager);

        this.syncService.initialize(this.accessManager);

        console.log("created Twilio manager");
    }

    getMessagingClient() {
        return this.messagingClient;
    }

    joinChannel() {

        console.log('Attempting to join "' + this.channelName + '" chat channel...');

        // Get the custom chat channel
        var promise = this.messagingClient.getChannelByUniqueName(this.channelName);
        return promise.then((channel) => {
            this.currentChannel = channel;
            if (!this.currentChannel) {
                // If it doesn't exist, let's create it
                this.messagingClient.createChannel({
                    uniqueName: this.channelName,
                    friendlyName: this.channelName
                }).then((channel) => {
                    console.log('Created "' + this.channelName + '" channel:');
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
        let data = {};
        let formData = new FormData();
        formData.append("file", file, file.name);

        this.fileService.post(formData).then((response: any)=> {
            var documentId = response.json();

            var documentAttributes = {
                documentId: documentId,
                filename: file.name
            };
            var messageAttributes: MessageAttributes = {
                customerUserId: this.customerUserId,
                messageTypeId: 2 // DOCUMENT
            };

            this.currentChannel.sendMessage(JSON.stringify(documentAttributes), messageAttributes);

            return documentId;
        });
    }
}