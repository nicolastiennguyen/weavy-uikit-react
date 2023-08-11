/// <reference types="react" />
import { PollOptionType } from '../types/types';
type Props = {
    appId: number;
    parentId: number;
    parentType: string;
    options: PollOptionType[];
};
declare const Poll: ({ appId, parentId, parentType, options }: Props) => JSX.Element;
export default Poll;
