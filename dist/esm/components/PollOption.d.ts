/// <reference types="react" />
type Props = {
    id: number;
    text: string;
    has_voted: boolean | undefined;
    ratio: number;
    onVote: (id: number) => Promise<void>;
};
declare const PollOption: ({ id, text, has_voted, ratio, onVote }: Props) => JSX.Element;
export default PollOption;
