export declare enum Feature {
    Attachments = "Attachments",
    CloudFiles = "CloudFiles",
    Embeds = "Embeds",
    Meetings = "Meetings",
    Mentions = "Mentions",
    Polls = "Polls",
    Previews = "Previews",
    Reactions = "Reactions",
    Receipts = "Receipts",
    Thumbnails = "Thumbnails",
    Typing = "Typing",
    Webhooks = "Webhooks",
    Comments = "Comments",
    Versions = "Versions",
    WebDAV = "WebDAV"
}
export declare const hasFeature: (features: string[], feature: Feature, enabled?: boolean) => boolean;
