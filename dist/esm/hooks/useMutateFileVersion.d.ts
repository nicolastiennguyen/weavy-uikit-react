import { MutationKey } from "react-query";
import { FileType, MessageType } from "../types/types";
export declare function useMutateFileVersionRestore(filesKey: MutationKey): import("react-query").UseMutationResult<MessageType, any, {
    versionFile: FileType;
}, any>;
export declare function useMutateFileVersionDelete(filesKey: MutationKey): import("react-query").UseMutationResult<void, any, {
    versionFile: FileType;
}, any>;
