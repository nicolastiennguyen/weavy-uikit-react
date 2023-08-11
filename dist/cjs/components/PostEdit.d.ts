/// <reference types="react" />
import { EmbedType, FileType, MeetingType, MemberType, PollOptionType, ReactableType } from '../types/types';
type Props = {
    appId: number;
    id: number;
    text: string;
    html: string;
    created_at: string;
    created_by: MemberType;
    attachments: FileType[];
    reactions: ReactableType[];
    embed: EmbedType | undefined;
    meeting?: MeetingType | undefined;
    options?: PollOptionType[];
    onClose: (e?: any) => void;
};
declare const PostEdit: ({ appId, id, text, embed, attachments, options, meeting, onClose }: Props) => JSX.Element;
export default PostEdit;
