/// <reference types="react" />
import { AppFeatures } from '../types/types';
type Props = {
    appId: number;
    parentId: number;
    type: "posts" | "files" | "apps";
    features: string[];
    appFeatures: AppFeatures | undefined;
};
declare const Comments: ({ appId, parentId, type, features, appFeatures }: Props) => JSX.Element;
export default Comments;
