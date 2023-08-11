import { BlobType, MessageType } from "../types/types";
export default function useMutateMessage(): import("react-query").UseMutationResult<MessageType, unknown, {
    id: number | null;
    text: string;
    userId: number;
    blobs: BlobType[];
    meeting: number | null;
    callback: Function;
}, {
    tempId: number;
}>;
