import React from "react";
import { UserContextProps } from "../types/types";
export declare const UserContext: React.Context<UserContextProps>;
type Props = {
    client: any;
    children: React.ReactNode;
};
declare const UserProvider: ({ children, client }: Props) => JSX.Element;
export default UserProvider;
