import { BlobType, MessageType, PollOptionType } from "../types/types";
export default function useMutatePost(): import("react-query").UseMutationResult<MessageType, unknown, {
    appId: number | null;
    text: string;
    blobs: BlobType[];
    meeting: number | null;
    embed: number | null;
    options: PollOptionType[];
}, {
    tempId: number;
}>;
