import React from "react";
import { CloudFilesContextProps, WeavyContextOptions } from "../types/types";
export declare const CloudFilesContext: React.Context<CloudFilesContextProps>;
type Props = {
    client: any;
    options: WeavyContextOptions;
    children: React.ReactNode;
};
declare const CloudFilesProvider: ({ children, options, client }: Props) => JSX.Element;
export default CloudFilesProvider;
