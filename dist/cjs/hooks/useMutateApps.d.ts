import { QueryKey } from "react-query";
import { AppType } from "../types/types";
export declare function useMutateAppsSubscribe(appKey: QueryKey): import("react-query").UseMutationResult<AppType, any, {
    appId: number;
    subscribe: boolean;
}, any>;
