import { BlobType, FileType, MessageType } from "../types/types";
export default function useMutateEditPost(): import("react-query").UseMutationResult<MessageType, unknown, {
    id: number | null;
    appId: number | null;
    parentId: number | null;
    text: string;
    blobs: BlobType[];
    attachments: FileType[];
    meeting: number | null;
    embed: number | null;
}, void>;
