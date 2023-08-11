/// <reference types="react" />
export declare function useSessionState<S>(key: string, defaultValue: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>];
