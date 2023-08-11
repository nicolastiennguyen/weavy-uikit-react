import React from "react";
import { FileRejection, DropEvent, Accept } from "react-dropzone";
type Props = {
    onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void;
    accept?: Accept;
    dragClass: string;
    children?: React.ReactNode;
};
declare const Dropzone: ({ onDrop, accept, dragClass, children }: Props) => JSX.Element;
export default Dropzone;
