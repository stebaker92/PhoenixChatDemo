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

    // //typescript hack for jQuery // todo install jquery.d.ts (currently won't install)
    // $(s: any) {
    //     return (<any>window).$(s);
    // }

    connectedToAgent = false;
    @Input() car: Car;
    username = this.chatService.username;

    messages: Message[] = [];
    input = "";

    constructor(private chatService: ChatService) {
    }

    ngOnInit() {

        this.print('Logged in as "' + this.username + '" ...');

        this.chatService.getMessagingClient().then(() => {

            this.chatService.createTask(this.username, this.car).then(()=> {
                console.log("watching channel for events");

                this.chatService.currentChannel.on("typingStarted", (member) => {
                    this.updateTypingIndicator(true, member);
                });

                this.chatService.currentChannel.on("typingEnded", (member) => {
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

    membersTyping: string;

    updateTypingIndicator(display: boolean, member?) {
        if (display) {
            this.membersTyping = member.userInfo.identity;
        } else {
            this.membersTyping = null;
        }
    }

    onKeyPress(keyCode) {
        this.chatService.currentChannel.typing();
    }

    onSubmit() {
        console.log("on submit called");
        this.chatService.currentChannel.sendMessage(this.input);
        this.input = "";
    }

    print(infoMessage: string) {
        let message = new Message();
        message.isInfo = true;
        message.body = infoMessage;
        this.messages.push(message);
    }

    printMessage(message: Message) {
        message.isMe = message.author === this.username;
        this.messages.push(message);
    }
}