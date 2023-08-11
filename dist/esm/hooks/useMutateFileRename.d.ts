import { MutationKey } from "react-query";
import { FileType, ServerErrorResponse } from "../types/types";
export default function useMutateFileRename(filesKey: MutationKey): import("react-query").UseMutationResult<FileType, ServerErrorResponse, {
    file: FileType;
    name: string;
}, void>;
