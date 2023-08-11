import { Mutation, MutationKey, QueryKey } from "react-query";
import { UploadProgressProps } from "./useFileUploader";
import { BlobType, FileType, ServerErrorResponse } from "../types/types";
export type CreateFileProps = {
    blob: BlobType;
    file?: FileType;
    replace?: boolean;
};
export type MutateFileProps = {
    file: File;
    onProgress?: (variables: UploadProgressProps) => void;
};
export type MutationFileContext = {
    file: FileType;
    blob: BlobType;
};
export type FileMutation = Mutation<FileType | BlobType, ServerErrorResponse, MutateFileProps, MutationFileContext | undefined>;
export declare function isFileMutation(mutation: unknown): mutation is FileMutation;
export declare function useMutatingFileUploads(filesKey: MutationKey): {
    mutations: FileMutation[];
    status: string | undefined;
    progress: number | undefined;
};
export declare function useRemoveMutatingFileUpload(filesKey: MutationKey): (mutation: FileMutation) => void;
export declare function useClearMutatingFileUpload(filesKey: MutationKey): () => void;
export declare function useMutateFileUpload(filesKey: QueryKey, createFile?: ({ blob, replace }: CreateFileProps) => Promise<FileType>): import("react-query").UseMutationResult<BlobType, ServerErrorResponse, MutateFileProps, MutationFileContext>;
export declare function useMutateFileCreate(filesKey: QueryKey, createFile: ({ blob, file, replace }: CreateFileProps) => Promise<FileType>): import("react-query").UseMutationResult<FileType, ServerErrorResponse, CreateFileProps, MutationFileContext>;
