import type { Placement } from '@floating-ui/react';
export interface TooltipProps {
    content?: React.ReactNode;
    children: React.ReactElement;
    placement?: Placement;
    offset?: number | [number, number];
    trigger?: 'hover' | 'click';
    interactive?: boolean;
    disabled?: boolean;
    hideOnClick?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    arrow?: boolean;
    mode?: 'custom';
    invertTheme?: boolean;
    contentClassName?: string;
    root?: HTMLElement | null | (() => HTMLElement | null);
}
