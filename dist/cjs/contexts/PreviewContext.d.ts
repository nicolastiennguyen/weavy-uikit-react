import React from "react";
import { PreviewContextProps } from "../types/types";
export declare const PreviewContext: React.Context<PreviewContextProps>;
type Props = {
    client: any;
    children: React.ReactNode;
};
declare const PreviewProvider: ({ client, children }: Props) => JSX.Element;
export default PreviewProvider;
