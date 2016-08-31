export class Message {
    author: string;
    body: string;
    attributes: any;

    isMe: boolean;
    isInfo: boolean;

    displayName: string; // name taken from message author
}