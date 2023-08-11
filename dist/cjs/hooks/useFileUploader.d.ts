import { BlobType } from "../types/types";
export type UploadFileProps = {
    file: File;
    onProgress?: (variables: UploadProgressProps) => void;
};
export type UploadProgressProps = {
    progress: number;
};
export declare function useUploadFile(): (file: File, onProgress?: ((variables: UploadProgressProps) => void) | undefined) => Promise<BlobType>;
export default function useFileUploader(callback: Function): import("react-query").UseMutationResult<void, any, any, unknown>;
