export class Message {
    author: string;
    body: string;
    attributes: MessageAttributes;

    isMe: boolean;
    isInfo: boolean;

    displayName: string; // name taken from message author

    //document stuff

    filename: string;
    documentId: number;
    isDocument: boolean;
}

export class MessageAttributes {
    messageTypeId: string;
    customerId: number;
    from: string;
}