import { TippyProps } from '@tippyjs/react/headless';
export interface TooltipProps extends TippyProps {
    mode?: 'custom';
    invertTheme?: boolean;
    contentClassName?: string;
}
