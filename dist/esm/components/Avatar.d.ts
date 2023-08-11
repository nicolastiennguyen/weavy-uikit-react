/// <reference types="react" />
type Props = {
    id?: number;
    name: string;
    src: string;
    presence?: string;
    size?: number;
    className?: string;
};
declare const Avatar: ({ id, src, name, presence, size, className }: Props) => JSX.Element;
export default Avatar;
