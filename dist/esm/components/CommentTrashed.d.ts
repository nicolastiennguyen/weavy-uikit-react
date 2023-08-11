/// <reference types="react" />
import { EmbedType, FileType, MemberType, ReactableType } from "../types/types";
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
};
declare const CommentTrashed: ({ id, appId, parentId }: Props) => JSX.Element;
export default CommentTrashed;
