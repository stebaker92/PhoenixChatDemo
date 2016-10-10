import {Component, OnInit, Input} from '@angular/core'
import {ChatService} from "./chat.service";
import {Message, MessageAttributes} from "./models/message"
import {MessageComponent} from "./message.component";
import {Member} from "./models/member";

@Component({
    selector: 'chat',
    templateUrl: 'app/chat.component.html',
    styleUrls: ['app/chat.component.css'],
    directives: [MessageComponent]
})

export class ChatComponent implements OnInit {

    // //typescript hack for jQuery // installing jquery.d.ts fails
    // $(s: any) {
    //     return (<any>window).$(s);
    // }

    // True when connected to the chat channel
    connectedToAgent = false;

    customerId: number;

    messages: Message[] = [];

    input = "";

    membersTyping: string;

    //start chat button clicked
    chatStarted: boolean;

    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        this.chatService.setupTwilio();
        this.customerId = this.chatService.customerId;
    }

    startChat() {
        this.chatStarted = true;

        console.log("attempting to join channel");

        this.print('Logged in with customerId: "' + this.customerId);

        this.chatService.joinThenCreateTask().then(() => {
            console.log("watching channel for events");
            this.connectedToAgent = true;
            this.chatService.currentChannel.on("typingStarted", (member) => {
                this.updateTypingIndicator(true, member);
            });

            this.chatService.currentChannel.on("typingEnded", () => {
                this.updateTypingIndicator(false);
            });

            this.chatService.currentChannel.on("messageAdded", (message: Message)=> {
                this.connectedToAgent = true;
                console.log("message received", message.body);
                this.printMessage(message);
            });

            this.chatService.currentChannel.on("memberJoined", (member: Member) => {
                this.connectedToAgent = true;
                var displayName = member.userInfo.identity.split(":")[2].replace("_", " ");
                this.print("You are now connected to '" + displayName + "' ");

                console.log("member joined", member);
            });

            this.chatService.currentChannel.on("memberLeft", (member: Member) => {
                var displayName = member.userInfo.identity.split(":")[2].replace("_", " ");
                this.print("'" + displayName + "' has left the chat");
            });
        });
    }


    sendDocument(event) {
        console.log("sendDoc called");

        var files = event.srcElement.files;
        if (!files) {
            return;
        }

        console.log(files);

        this.chatService.sendFile(files[0]);
    }

    updateTypingIndicator(display: boolean, member?) {
        if (display) {
            this.membersTyping = member.userInfo.identity;
        } else {
            this.membersTyping = null;
        }
    }

    onKeyPress() {
        this.chatService.currentChannel.typing();
    }

    onSubmit() {
        console.log("on submit called");
        var attributes: MessageAttributes = {
            customerId: this.customerId,
            messageTypeId: 0
        };
        this.chatService.currentChannel.sendMessage(this.input, attributes);
        this.input = "";
    }

    print(infoMessage: string) {
        let message = new Message();
        message.isInfo = true;
        message.body = infoMessage;
        this.messages.push(message);
    }

    printMessage(message: Message) {

        var senderId = parseInt(message.author.split(":")[1]);

        if (message.attributes.messageTypeId === 1) { // SMS
            return;
        }
        else if (message.attributes.messageTypeId === 2) { // DOCUMENT
            message.filename = JSON.parse(message.body).filename;
            message.documentId = JSON.parse(message.body).documentId;
            message.isDocument = true;
        }

        message.isMe = senderId === this.customerId;
        message.displayName = message.author.split(":")[2].replace("_", " ");
        this.messages.push(message);
    }
}