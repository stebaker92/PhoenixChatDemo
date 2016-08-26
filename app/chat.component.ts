import {Component, OnInit, Input} from '@angular/core'
import {ChatService} from "./chat.service";
import {Car} from "./car";
import {Message} from "./message"
import {MessageComponent} from "./message.component";

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

    connectedToAgent = false;
    @Input() car: Car;
    customerId = this.chatService.customerId;

    messages: Message[] = [];
    input = "";
    membersTyping: string;
    chatStarted: boolean;

    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
    }

    startChat() {
        this.chatStarted = true;

        this.chatService.getMessagingClient().then(() => {
            console.log("attempting to join channel");

            this.print('Logged in as customer: "' + this.customerId + '" ...');

            this.chatService.joinThenCreateTask(this.customerId, this.car).then(() => {
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

                this.chatService.currentChannel.on("memberJoined", (member) => {
                    this.connectedToAgent = true;
                    this.print("You are now connected to '" + member.identity + "' ");

                    console.log("member joined", member);
                    console.log("context is: ", this.car.id, this.car.name);
                });
            });
        });

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
        this.chatService.currentChannel.sendMessage(this.input, {CustomerId: this.customerId});
        this.input = "";
    }

    print(infoMessage: string) {
        let message = new Message();
        message.isInfo = true;
        message.body = infoMessage;
        this.messages.push(message);
    }

    printMessage(message: Message) {
        message.isMe = message.author === this.customerId;
        message.displayName = message.author.split(":")[2].replace("_", " ");
        this.messages.push(message);
    }
}