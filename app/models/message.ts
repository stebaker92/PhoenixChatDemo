export class Message {
    author: string; // the identity of the sender i.e customer:1:mr_test
    body: string;
    _body: string; // Chat setter
    attributes: MessageAttributes;

    isMe: boolean;
    isInfo: boolean;

    // display name parsed from from message author or retrieved from DB
    displayName: string;
    isEvent: boolean;

    // Document stuff
    filename: string;
    documentId: number;
    isDocument: boolean;
}

export class MessageAttributes {
    messageTypeId: number;
    customerUserId: number;
    messageEventTypeId?: number;
}