/// <reference types="react" />
import { UseInfiniteQueryResult } from "react-query";
import { AppFeatures, FilesResult } from "../types/types";
type Props = {
    appId: number;
    infiniteFiles: UseInfiniteQueryResult<FilesResult, unknown>;
    previewId?: number;
    features: string[];
    appFeatures: AppFeatures | undefined;
    onClose?: () => void;
};
declare const PreviewFiles: ({ appId, infiniteFiles, previewId, features, appFeatures, onClose }: Props) => JSX.Element;
export default PreviewFiles;
