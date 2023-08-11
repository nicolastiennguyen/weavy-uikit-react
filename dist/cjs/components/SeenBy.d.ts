/// <reference types="react" />
import { MemberType } from "../types/types";
type Props = {
    id: number;
    parentId: number | null;
    seenBy: MemberType[];
    createdAt: string;
};
declare const SeenBy: ({ seenBy }: Props) => JSX.Element;
export default SeenBy;
