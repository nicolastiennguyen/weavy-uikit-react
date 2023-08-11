export default function useMutateStarred(): import("react-query").UseMutationResult<Response, unknown, {
    id: number | null;
    star: boolean;
}, unknown>;
