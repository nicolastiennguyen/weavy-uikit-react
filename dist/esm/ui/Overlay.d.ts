import React from 'react';
import { Styles } from 'react-modal';
type OverlayProps = {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    style?: Styles;
    closeOnEsc?: boolean;
    onClose?: () => void;
};
declare const UIOverlay: {
    UI: ({ children, className, isOpen, style, closeOnEsc, onClose }: OverlayProps) => JSX.Element;
};
export default UIOverlay;
