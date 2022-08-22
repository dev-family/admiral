/// <reference types="react" />
export interface UnitNumberProps {
    value: string | number;
    offset?: number;
    current?: boolean;
}
export interface SingleNumberProps {
    value: string;
    count: number;
}
export default function SingleNumber(props: SingleNumberProps): JSX.Element;
