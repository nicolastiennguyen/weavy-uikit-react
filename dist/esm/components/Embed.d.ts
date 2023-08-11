/// <reference types="react" />
import { EmbedType } from '../types/types';
type Props = {
    embed: EmbedType;
    onRemove?: Function;
    onSwap?: Function | null;
};
declare const Embed: ({ embed, onRemove, onSwap }: Props) => JSX.Element;
export default Embed;
