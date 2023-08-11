import { BlobType, MessageType } from "../types/types";
export default function useMutateComment(): import("react-query").UseMutationResult<MessageType, unknown, {
    parentId: number | null;
    type: "posts" | "files" | "apps";
    text: string;
    blobs: BlobType[];
    meeting: number | null;
    embed: number | null;
}, {
    tempId: number;
}>;
