import React from "react";
import { PreviewFormatType } from "../types/types";
type ImageProps = {
    src: string;
    width?: number;
    height?: number;
};
export declare const PreviewImage: ({ src, width, height }: ImageProps) => JSX.Element;
type DocumentProps = {
    src: string;
    client: any;
};
export declare const PreviewDocument: ({ src, client }: DocumentProps) => JSX.Element;
type MediaProps = {
    format: string;
    src: string;
    name: string;
    mediaType?: string;
};
export declare const PreviewMedia: ({ format, src, name, mediaType }: MediaProps) => JSX.Element;
type TextProps = {
    src: string;
    html?: boolean;
    code?: boolean;
};
export declare const PreviewText: ({ src, html, code }: TextProps) => JSX.Element;
type EmbedProps = {
    src: string;
    name: string;
    icon: string;
    provider?: string;
};
export declare const PreviewEmbed: ({ src, name, icon, provider }: EmbedProps) => JSX.Element;
type IconProps = {
    children?: React.ReactNode;
    src: string;
    icon: string;
    provider?: string;
    className?: string;
};
export declare const PreviewIcon: ({ children, src, icon, provider, className }: IconProps) => JSX.Element;
type PreviewProps = {
    client: any;
    src: string;
    link?: string;
    format: PreviewFormatType;
    name: string;
    icon: string;
    width?: number;
    height?: number;
    mediaType?: string;
    provider?: string;
};
export declare const Preview: ({ client, src, link, format, name, icon, width, height, mediaType, provider }: PreviewProps) => JSX.Element;
export default Preview;
