/// <reference types="react" />
import { AppFeatures, EmbedType, FileType, MemberType, ReactableType } from '../types/types';
type Props = {
    appId: number;
    parentId: number;
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
    is_trashed: boolean;
    features: string[];
    appFeatures: AppFeatures | undefined;
};
declare const Comment: ({ ...props }: Props) => JSX.Element;
export default Comment;
