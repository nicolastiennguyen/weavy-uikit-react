/// <reference types="react" />
import { ReactableType } from "../types/types";
type ReactionMenuProps = {
    id: number;
    parentId: number | null;
    type: "messages" | "posts" | "comments";
    placement?: "top" | "top-start" | "top-end";
    reactions: ReactableType[];
};
type ReactionsProps = {
    id: number;
    type: "messages" | "posts" | "comments";
    parentId: number | null;
    reactions: ReactableType[];
    featureEnabled?: boolean;
};
export declare const ReactionsLike: ({ id, parentId, type, reactions }: ReactionMenuProps) => JSX.Element;
export declare const ReactionsMenu: ({ id, parentId, type, placement, reactions }: ReactionMenuProps) => JSX.Element;
export declare const ReactionsList: ({ id, type, reactions, featureEnabled }: ReactionsProps) => JSX.Element;
export {};
