export default function useEvents(): {
    dispatch: (event: string, data: any) => void;
    on: (event: string, cb: Function) => () => any;
    off: (event: string, cb: Function) => void;
    events: object[];
};
