export default function useMutateReaction(): import("react-query").UseMutationResult<Response, unknown, {
    parentId: number | null;
    id: number | null;
    type: "messages" | "posts" | "comments";
    reaction: string;
}, void>;
