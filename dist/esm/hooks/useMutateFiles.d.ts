import { FileType } from "../types/types";
import { CreateFileProps } from "./useMutateFile";
export declare const useMutateFilesCreate: (appId: number, tags: any) => ({ blob, replace }: CreateFileProps) => Promise<FileType>;
