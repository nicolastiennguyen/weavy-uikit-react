/// <reference types="react" />
import { AppFeatures, EmbedType, FileType, MeetingType, MemberType, PollOptionType, ReactableType } from '../types/types';
type Props = {
    appId: number;
    id: number;
    text: string;
    html: string;
    created_at: string;
    modified_at?: string;
    created_by: MemberType;
    trashed_at?: string;
    attachments: FileType[];
    reactions: ReactableType[];
    embed: EmbedType | undefined;
    comment_count?: number;
    is_subscribed: boolean;
    options?: PollOptionType[];
    meeting?: MeetingType;
    features: string[];
    appFeatures: AppFeatures | undefined;
    onEdit: (e: any) => void;
};
declare const PostView: ({ appId, id, html, created_at, modified_at, created_by, attachments, reactions, embed, comment_count, is_subscribed, options, meeting, features, appFeatures, onEdit }: Props) => JSX.Element;
export default PostView;
