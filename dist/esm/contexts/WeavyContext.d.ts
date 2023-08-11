import React from "react";
import { WeavyContextOptions, WeavyContextProps } from "../types/types";
import WeavyClient from "../client/WeavyClient";
export declare const WeavyContext: React.Context<WeavyContextProps>;
type WeavyProviderProperties = {
    children: React.ReactNode;
    client: WeavyClient | null;
    options?: WeavyContextOptions;
};
declare const WeavyProvider: ({ children, client, options }: WeavyProviderProperties) => JSX.Element;
export default WeavyProvider;
