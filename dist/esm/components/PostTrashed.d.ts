/// <reference types="react" />
import { EmbedType, FileType, MemberType, ReactableType } from "../types/types";
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
};
declare const PostTrashed: ({ id, appId }: Props) => JSX.Element;
export default PostTrashed;
