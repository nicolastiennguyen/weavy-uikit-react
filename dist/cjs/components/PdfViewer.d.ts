/// <reference types="react" />
type Props = {
    src: string;
    pdfCMapsUrl: string;
    pdfWorkerUrl: string;
};
declare const PdfViewer: ({ src, pdfCMapsUrl, pdfWorkerUrl }: Props) => JSX.Element;
export default PdfViewer;
