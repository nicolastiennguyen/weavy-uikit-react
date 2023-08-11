/// <reference types="react" />
import { MeetingType } from "../types/types";
type Props = {
    meeting: MeetingType;
};
declare const MeetingCard: ({ meeting }: Props) => JSX.Element;
export default MeetingCard;
