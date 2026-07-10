interface Size {
    width: number;
    height: number;
}
export default function useSize(target: React.RefObject<HTMLElement | null>): Size | undefined;
export {};
