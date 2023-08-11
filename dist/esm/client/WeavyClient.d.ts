import { IWeavyClient, WeavyClientOptions } from '../types/types';
export default class WeavyClient implements IWeavyClient {
    url: string;
    connection: import("@microsoft/signalr").HubConnection;
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
