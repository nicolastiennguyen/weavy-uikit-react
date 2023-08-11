import React from "react";
import { MessengerContextProps } from "../types/types";
export declare const MessengerContext: React.Context<MessengerContextProps>;
type Props = {
    children: React.ReactNode;
};
declare const MessengerProvider: ({ children }: Props) => JSX.Element;
export default MessengerProvider;
