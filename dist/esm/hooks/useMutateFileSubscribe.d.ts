import { MutationKey } from "react-query";
import { FileType, ServerErrorResponse } from "../types/types";
export declare function useMutateFileSubscribe(filesKey: MutationKey): import("react-query").UseMutationResult<FileType, any, {
    file: FileType;
}, any>;
export declare function useMutateFileUnsubscribe(filesKey: MutationKey): import("react-query").UseMutationResult<FileType, ServerErrorResponse, {
    file: FileType;
}, any>;
