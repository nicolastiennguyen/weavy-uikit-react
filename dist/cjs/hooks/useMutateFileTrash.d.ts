import { MutationKey } from "react-query";
import { FileType } from "../types/types";
export declare function useMutateFileTrash(filesKey: MutationKey): import("react-query").UseMutationResult<FileType, any, {
    file: FileType;
}, any>;
export declare function useMutateFileRestore(filesKey: MutationKey): import("react-query").UseMutationResult<FileType, any, {
    file: FileType;
}, any>;
export declare function useMutateFileDeleteForever(filesKey: MutationKey): import("react-query").UseMutationResult<void, unknown, {
    file: FileType;
}, void>;
