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
    features: string[];
    appFeatures: AppFeatures | undefined;
    onEdit: (e: any) => void;
};
declare const CommentView: ({ appId, id, parentId, html, created_at, modified_at, created_by, attachments, reactions, embed, features, appFeatures, onEdit }: Props) => JSX.Element;
export default CommentView;
