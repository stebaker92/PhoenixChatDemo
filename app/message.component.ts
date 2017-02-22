import {Component, Input, OnInit} from '@angular/core';
import {Message} from './models/message';
import {FileService} from "./file.service";

@Component({
    selector: 'message',
    templateUrl: 'app/message.component.html',
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