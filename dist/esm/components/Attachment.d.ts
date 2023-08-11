/// <reference types="react" />
type Props = {
    previewFormat: string;
    url?: string;
    previewUrl?: string;
    mediaType: string;
    name: string;
    kind: string;
    size?: number;
    provider?: string;
    onClick?: (e: any) => void;
};
declare const Attachment: ({ url, previewUrl, name, size, provider, onClick }: Props) => JSX.Element;
export default Attachment;
