import { InfiniteData, QueryClient, QueryKey } from "react-query";
export declare function findAnyExistingItem<TDataItem>(queryData: InfiniteData<any> | undefined, propertyName: string, value: string, copy?: boolean): TDataItem | undefined;
export declare function addToQueryData(queryData: any, item: any, sorting?: {
    by?: string;
    descending?: boolean;
}, tempId?: number): any;
export declare function updateQueryData(queryData: any, select: number | ((item: any) => boolean), fnUpdater: Function): any;
export declare function removeQueryData(queryData: any, select: number | ((item: any) => boolean)): any;
export declare const addCacheItem: <T>(queryClient: QueryClient, key: QueryKey, item: any, tempId?: number, sorting?: {
    by?: string;
    descending?: boolean;
}) => void | T;
export declare const updateCacheItem: <T>(queryClient: QueryClient, key: QueryKey, select: number | ((item: any) => boolean), fnUpdater: Function) => void | T;
export declare const removeCacheItem: <T>(queryClient: QueryClient, key: QueryKey, select: number | ((item: any) => boolean)) => void | T;
