export class Message {
    author: string; //the identity of the sender i.e customer:1:mr_test
    body: string;
    attributes: MessageAttributes;

    isMe: boolean;
    isInfo: boolean;

    displayName: string; // display name parsed from from message author or retrieved from DB
    isEvent: boolean;

    //document stuff
    filename: string;
    documentId: number;
    isDocument: boolean;
}

export class MessageAttributes {
    messageTypeId: number;
    customerUserId: number;
    messageEventTypeId?: number;
}