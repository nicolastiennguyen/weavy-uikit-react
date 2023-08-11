export default function useMutateTyping(): import("react-query").UseMutationResult<Response, unknown, {
    id: number | null;
    type: "posts" | "comments" | "messages";
    location: "apps" | "posts" | "messages" | "files";
}, unknown>;
