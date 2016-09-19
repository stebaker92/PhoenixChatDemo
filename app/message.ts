export class Message {
    author: string;
    body: string;
    attributes: {MessageTypeId: number, CustomerId: number};

    isMe: boolean;
    isInfo: boolean;

    displayName: string; // name taken from message author

    //document stuff

    filename: string;
    documentId: number;
    isDocument: boolean;
}