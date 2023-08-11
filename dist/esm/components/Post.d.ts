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
    is_trashed: boolean;
    options?: PollOptionType[];
    meeting?: MeetingType;
    features: string[];
    appFeatures: AppFeatures | undefined;
};
declare const Post: ({ ...props }: Props) => JSX.Element;
export default Post;
