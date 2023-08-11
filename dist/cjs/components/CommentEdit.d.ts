/// <reference types="react" />
import { EmbedType, FileType, MemberType, ReactableType } from '../types/types';
type Props = {
    appId: number;
    parentId: number;
    id: number;
    text: string;
    html: string;
    created_at: string;
    created_by: MemberType;
    attachments: FileType[];
    reactions: ReactableType[];
    embed: EmbedType | undefined;
    onClose: (e?: any) => void;
};
declare const CommentEdit: ({ appId, parentId, id, text, embed, attachments, onClose }: Props) => JSX.Element;
export default CommentEdit;
