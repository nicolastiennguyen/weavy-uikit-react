export default function useMutateRead(): import("react-query").UseMutationResult<any, unknown, {
    id: number | null;
    read: boolean;
    messageId: number | null;
}, void>;
