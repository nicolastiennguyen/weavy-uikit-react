/// <reference types="react" />
import * as _microsoft_signalr from '@microsoft/signalr';
import React, { FC, ReactNode } from 'react';
import { Styles } from 'react-modal';

interface IWeavyClient {
    url: string;
    tokenFactoryInternal: () => Promise<string>;
    subscribe: Function;
    unsubscribe: Function;
    destroy: Function;
    get: (url: string, retry?: boolean) => Promise<Response>;
    post: (url: string, method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", body: string | FormData, contentType?: string, retry?: boolean) => Promise<Response>;
    upload: (url: string, method: "POST" | "PUT" | "PATCH", body: string | FormData, contentType?: string, onProgress?: (progress: number) => void, retry?: boolean) => Promise<Response>;
}
type WeavyClientOptions = {
    url: string;
    tokenFactory: (refresh: boolean) => Promise<string>;
};
type WeavyContextProps = {
    client: IWeavyClient | null;
    options?: WeavyContextOptions;
};
type WeavyContextOptions = {
    zoomAuthenticationUrl?: string;
    teamsAuthenticationUrl?: string;
    enableScrollbarDetection?: boolean;
    filebrowserUrl?: string;
    pdfWorkerUrl?: string;
    pdfCMapsUrl?: string;
    reactions?: string[];
};
type MessengerContextProps = {
    selectedConversationId: null | number;
    setSelectedConversationId: Function;
};
type SortOrder = {
    by: string;
    descending: boolean;
};
type FileOrderBy = "id" | "name" | "size" | "created_at" | "modified_at" | "timestamp";
type FileOrder = SortOrder & {
    by: FileOrderBy;
    descending: boolean;
};
type FileView = "list" | "grid";
type AppFeatures = {
    attachments?: boolean;
    cloudFiles?: boolean;
    embeds?: boolean;
    meetings?: boolean;
    mentions?: boolean;
    polls?: boolean;
    previews?: boolean;
    reactions?: boolean;
    receipts?: boolean;
    thumbnails?: boolean;
    typing?: boolean;
    comments?: boolean;
    versions?: boolean;
    webDAV?: boolean;
};

declare class WeavyClient implements IWeavyClient {
    url: string;
    connection: _microsoft_signalr.HubConnection;
    tokenFactory: (refresh: boolean) => Promise<string>;
    groups: string[];
    connectionEvents: any[];
    isConnectionStarted: any;
    token: string;
    tokenPromise: Promise<string> | null;
    EVENT_NAMESPACE: string;
    EVENT_CLOSE: string;
    EVENT_RECONNECTING: string;
    EVENT_RECONNECTED: string;
    constructor(options: WeavyClientOptions);
    get(url: string, retry?: boolean): Promise<Response>;
    post(url: string, method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", body: string | FormData, contentType?: string, retry?: boolean): Promise<Response>;
    upload(url: string, method: "POST" | "PUT" | "PATCH", body: string | FormData, contentType?: string, onProgress?: (progress: number) => void, retry?: boolean): Promise<Response>;
    getToken(refresh: boolean): Promise<string>;
    tokenFactoryInternal(refresh?: boolean, fromSR?: boolean): Promise<string>;
    subscribe(group: string, event: string, callback: any): Promise<void>;
    unsubscribe(group: string, event: string, callback: any): Promise<void>;
    destroy(): void;
    triggerHandler(name: string, ...data: any): void;
}

declare const WeavyContext: React.Context<WeavyContextProps>;
type WeavyProviderProperties = {
    children: React.ReactNode;
    client: WeavyClient | null;
    options?: WeavyContextOptions;
};
declare const WeavyProvider: ({ children, client, options }: WeavyProviderProperties) => JSX.Element;

declare const MessengerContext: React.Context<MessengerContextProps>;
type Props$1 = {
    children: React.ReactNode;
};
declare const MessengerProvider: ({ children }: Props$1) => JSX.Element;

interface IMessenger {
}

declare const Messenger: FC<IMessenger>;

declare const ConversationBadge: () => JSX.Element;

declare const ConversationList: () => JSX.Element;

interface ConversationProps {
    id?: number | null;
    showBackButton?: boolean;
    features?: AppFeatures | undefined;
}

declare const _default: React.MemoExoticComponent<({ id, showBackButton, features }: ConversationProps) => JSX.Element>;

interface ChatProps {
    uid: string;
    className?: string;
    features?: AppFeatures | undefined;
}

declare const Chat: ({ uid, className, features }: ChatProps) => JSX.Element;

interface PostsProps {
    uid: string;
    className?: string;
    features: AppFeatures | undefined;
}

declare const Posts: ({ uid, className, features }: PostsProps) => JSX.Element;

interface FilesProps {
    uid: string;
    className?: string;
    view?: FileView;
    order?: FileOrder;
    trashed?: boolean;
    features: AppFeatures | undefined;
}

declare const Files: ({ uid, className, view: initView, order: initOrder, trashed: initTrashed, features }: FilesProps) => JSX.Element;

declare const UIButton: {
    UI: any;
};

type DropdownProps = {
    directionX?: "left" | "right";
    directionY?: "up" | "down";
    icon?: string;
    children: React.ReactNode;
    className?: string;
    title?: string;
    buttonContent?: React.ReactNode;
    disabled?: boolean;
    noWrapper?: boolean;
    props?: React.HTMLAttributes<HTMLSpanElement>;
};
type ItemProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: any) => void;
    active?: boolean;
    props?: React.HTMLAttributes<HTMLDivElement>;
};
type AnchorProps = {
    children: React.ReactNode;
    className?: string;
    link?: string;
    active?: boolean;
    download?: boolean;
    props?: React.HTMLAttributes<HTMLAnchorElement>;
};
declare const UIDropdown: {
    UI: ({ directionX, directionY, icon, children, className, title, buttonContent, disabled, noWrapper, ...props }: DropdownProps) => JSX.Element;
    Item: ({ children, className, onClick, active, ...props }: ItemProps) => JSX.Element;
    Anchor: ({ children, className, link, active, download, ...props }: AnchorProps) => JSX.Element;
    Divider: () => JSX.Element;
};

type Props = {
    name: string;
    color?: string;
    size?: number;
    title?: string;
    className?: string;
};
type IconActiveStackProps = {
    className?: string;
    children: ReactNode;
};
declare const UIIcon: {
    UI: ({ name, color, size, className, title, ...props }: Props) => JSX.Element;
    ActiveStack: ({ className, children }: IconActiveStackProps) => JSX.Element;
};

type OverlayProps = {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    style?: Styles;
    closeOnEsc?: boolean;
    onClose?: () => void;
};
declare const UIOverlay: {
    UI: ({ children, className, isOpen, style, closeOnEsc, onClose }: OverlayProps) => JSX.Element;
};

export { UIButton as Button, Chat, _default as Conversation, ConversationBadge, ConversationList, UIDropdown as Dropdown, Files, UIIcon as Icon, Messenger, MessengerContext, MessengerProvider, UIOverlay as Overlay, Posts, WeavyClient, WeavyContext, WeavyProvider };
