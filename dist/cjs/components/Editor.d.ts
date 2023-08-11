/// <reference types="react" />
import { BlobType, EmbedType, FileType, MeetingType, PollOptionType } from '../types/types';
type Props = {
    id?: number;
    appId: number;
    parentId?: number;
    placeholder: string;
    text?: string;
    buttonText: string;
    embed?: EmbedType | undefined;
    attachments?: FileType[] | undefined;
    options?: PollOptionType[] | undefined;
    meeting?: MeetingType | undefined;
    showAttachments?: boolean;
    showCloudFiles?: boolean;
    showEmbeds?: boolean;
    showPolls?: boolean;
    showMeetings?: boolean;
    showTyping?: boolean;
    useDraft?: boolean;
    showMention?: boolean;
    onSubmit: (text: string, blobs: BlobType[], attachments: FileType[], meeting: number | null, embed: number | null, options: PollOptionType[]) => Promise<void>;
    editorType: "posts" | "comments" | "messages";
    editorLocation: "apps" | "posts" | "messages" | "files";
};
declare const Editor: ({ id, appId, parentId, placeholder, text, buttonText, embed, attachments: initialAttachments, options: initialOptions, meeting: initialMeeting, showAttachments, showCloudFiles, showEmbeds, showPolls, showMeetings, showTyping, useDraft, showMention, onSubmit, editorType, editorLocation }: Props) => JSX.Element;
export default Editor;
