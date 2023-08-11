import React, { createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import { QueryClient, QueryClientProvider } from "react-query";
import UserProvider from "./UserContext";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import PreviewProvider from "./PreviewContext";
import { detectScrollbars, detectScrollbarAdjustments } from '../utils/scrollbar-detection';
import CloudFilesProvider from "./CloudFilesContext";
import {  WeavyContextOptions, WeavyContextProps } from "../types/types";
import WeavyClient from "../client/WeavyClient";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);


export const WeavyContext = createContext<WeavyContextProps>({
  client: null,
  options: {}
});

type WeavyProviderProperties = {
  children: React.ReactNode,
  client: WeavyClient | null,
  options?: WeavyContextOptions
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

const WeavyProvider = ({ children, client, options }: WeavyProviderProperties) => {

  let defaultOptions: WeavyContextOptions = {
    zoomAuthenticationUrl: undefined,
    teamsAuthenticationUrl: undefined,    
    enableScrollbarDetection: true,
    filebrowserUrl: "https://filebrowser.weavy.io/v14/",
    reactions: ['😍', '😎', '😉', '😜', '👍']
  };

  let opts = { ...defaultOptions, ...options }

  if (opts.enableScrollbarDetection) {
    detectScrollbars().then(() => detectScrollbarAdjustments());
  }

  if (!client) {
    queryClient.clear();
  }

  return (
    <>
      {client &&
        <Router>
          <QueryClientProvider client={queryClient}>
            <WeavyContext.Provider value={{ client, options: opts }}>
              <UserProvider client={client}>
                <CloudFilesProvider options={opts} client={client}>
                  <PreviewProvider client={client}>
                    {children}
                  </PreviewProvider>
                </CloudFilesProvider>
              </UserProvider>
            </WeavyContext.Provider>
          </QueryClientProvider>
        </Router> 
      }
    </>
  )
};

export default WeavyProvider;
