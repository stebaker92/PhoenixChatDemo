import {Component, OnInit} from '@angular/core';
import {ChatService} from "./chat.service";
import {Message, MessageAttributes} from "./models/message";
import {Member} from "./models/member";
import {MessageType} from "./enums/message-type";

@Component({
    selector: 'chat',
    templateUrl: 'app/chat.component.html',
    styleUrls: ['app/chat.component.css']
})

export class ChatComponent implements OnInit {

    // True when connected to the chat channel
    connectedToChannel = false;

    customerUserId: number;

    messages: Message[] = [];

    input = '';

    membersTyping: string;

    // start chat button clicked
    chatStarted: boolean;

    // //typescript hack for jQuery // installing jquery.d.ts fails
    $(s: any) {
        return (<any>window).$(s);
    }

    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        this.chatService.setupTwilio();
        this.customerUserId = this.chatService.customerUserId;
    }

    startChat() {
        this.chatStarted = true;

        // Get the message history from the contact centre
        this.chatService.getMessages().then((response: any) => {
            this.messages = response.json();
            console.log(this.messages);
        });

        console.log("attempting to join channel");

        this.print('Logged in with customerUserId: ' + this.customerUserId);

        this.chatService.joinChannel().then(() => {
            console.log("watching channel for events");
            this.connectedToChannel = true;
            this.chatService.currentChannel.on("typingStarted", (member) => {
                this.updateTypingIndicator(true, member);
            });

            this.chatService.currentChannel.on("typingEnded", () => {
                this.updateTypingIndicator(false);
            });

            this.chatService.currentChannel.on("messageAdded", (message: Message) => {
                this.connectedToChannel = true;
                console.log("message received", message.body);
                this.printMessage(message);
            });

            this.chatService.currentChannel.on("memberJoined", (member: Member) => {
                this.connectedToChannel = true;

                console.log("member joined", member);
            });

            setTimeout(function () {
                let $messagingContext = this.$('#messages');
                $messagingContext.on('DOMNodeInserted', function () {
                    $messagingContext.scrollTop($messagingContext[0].scrollHeight);
                });
            }, 10000);
        });
    }


    sendDocument(event) {
        console.log("sendDoc called");

        let files = event.srcElement.files;
        if (!files) {
            return;
        }

        console.log(files);

        this.chatService.sendFile(files[0]);
        this.$("#chat-file-input").val(null);
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
        let attributes: MessageAttributes = {
            customerUserId: this.customerUserId,
            messageTypeId: 0
        };
        console.log("on submit called. message attributes is: ", attributes);

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

        let senderId;
        if (message.author !== 'system') {
            senderId = parseInt(message.author.split(":")[1], 10);
            message.isMe = senderId === this.customerUserId;
            message.displayName = message.author.split(":")[2].replace("_", " ");
        } else {
            senderId = -1;
            message.displayName = 'system';
            message.isEvent = true;
        }

        if (message.attributes.messageTypeId === MessageType.Sms) {
            return;
        } else if (message.attributes.messageTypeId === MessageType.Document) {
            message.filename = JSON.parse(message.body).filename;
            message.documentId = JSON.parse(message.body).documentId;
            message.isDocument = true;
        } else if (message.attributes.messageTypeId === MessageType.Event) {
            console.log('event happened:', message);
            switch (message.attributes.messageEventTypeId) {
                case 4:
                    message._body = 'We are now connecting you to an agent';
                    break;
                default:
                    // Don't show other events to the customer;
                    return;
            }
        }

        this.messages.push(message);
    }
}