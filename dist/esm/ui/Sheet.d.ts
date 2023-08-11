import React from 'react';
import { Styles } from 'react-modal';
type SheetProps = {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    style?: Styles;
    title: string;
    onClose?: (e: any) => void;
};
declare const UISheet: {
    UI: ({ children, className, isOpen, style, title, onClose }: SheetProps) => JSX.Element;
};
export default UISheet;
