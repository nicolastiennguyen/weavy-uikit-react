/// <reference types="react" />
import { AppFeatures } from '../types/types';
type Props = {
    appId: number;
    features: string[];
    appFeatures: AppFeatures | undefined;
};
declare const PostList: ({ appId, features, appFeatures }: Props) => JSX.Element;
export default PostList;
