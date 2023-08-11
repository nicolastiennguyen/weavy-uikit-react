export default function useMutateDeleteReaction(): import("react-query").UseMutationResult<Response, unknown, {
    id: number | null;
    parentId: number | null;
    type: "messages" | "posts" | "comments";
    reaction: string;
}, void>;
