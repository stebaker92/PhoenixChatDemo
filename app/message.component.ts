import {Component, Input, OnInit} from '@angular/core'
import {Message} from './message'
import {NgClass} from "@angular/common";

@Component({
    selector: 'message',
    templateUrl: 'app/message.component.html',
    directives: [NgClass],
    styleUrls: ["app/chat.component.css"]
})
export class MessageComponent implements OnInit {
    @Input() message: Message;

    ngOnInit(){

    }
}