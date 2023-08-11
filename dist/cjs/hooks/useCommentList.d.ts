import { MessagesResult } from "../types/types";
export default function useCommentList(parentId: number | null, type: "posts" | "files" | "apps", options: any): import("react-query").UseInfiniteQueryResult<MessagesResult, unknown>;
