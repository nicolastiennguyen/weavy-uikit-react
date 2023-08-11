import { BlobType, FileType, MessageType, PollOptionType } from "../types/types";
export default function useMutateEditPost(): import("react-query").UseMutationResult<MessageType, unknown, {
    id: number | null;
    appId: number | null;
    text: string;
    blobs: BlobType[];
    attachments: FileType[];
    options: PollOptionType[];
    meeting: number | null;
    embed: number | null;
}, void>;
