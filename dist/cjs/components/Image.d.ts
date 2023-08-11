import React from "react";
type ImageProps = {
    src: string;
    previewSrc?: string;
    width?: number;
    height?: number;
    more?: number;
    onClick: (e: any) => void;
};
export declare function checkImageLoad(img: HTMLImageElement): void;
export declare function imageLoaded(event: any): void;
export declare const Image: ({ src, previewSrc, width, height, more, onClick }: ImageProps) => JSX.Element;
type ImageGridProps = {
    children: React.ReactNode;
    limit?: number;
};
export declare const ImageGrid: ({ children, limit }: ImageGridProps) => JSX.Element;
export default Image;
