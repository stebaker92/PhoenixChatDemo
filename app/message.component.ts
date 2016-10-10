import {Component, Input, OnInit} from '@angular/core'
import {Message} from './models/message'
import {NgClass} from "@angular/common";
import {FileService} from "./file-service";

@Component({
    selector: 'message',
    templateUrl: 'app/message.component.html',
    directives: [NgClass],
    styleUrls: ["app/chat.component.css"]
})
export class MessageComponent implements OnInit {
    @Input() message: Message;

    constructor(private fileService: FileService) {
    }

    ngOnInit() {
    }

    download(documentId: number) {
        this.fileService.download(documentId, this.message.filename);
    }
}