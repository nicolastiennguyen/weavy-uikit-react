export default function useEmbeds(callback: Function): {
    getEmbeds: (content: string) => Promise<void>;
    initEmbeds: (urls: string[]) => void;
    clearEmbeds: () => void;
};
