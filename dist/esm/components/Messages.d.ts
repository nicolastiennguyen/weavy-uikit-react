/// <reference types="react" />
import { AppFeatures, MembersResult } from '../types/types';
type Props = {
    id: number;
    members: MembersResult | undefined;
    displayName?: string;
    avatarUrl?: string;
    lastMessageId: number | null;
    chatRoom: boolean;
    features: string[];
    appFeatures: AppFeatures | undefined;
};
declare const Messages: ({ id, members, displayName, avatarUrl, lastMessageId, chatRoom, features, appFeatures }: Props) => JSX.Element;
export default Messages;
