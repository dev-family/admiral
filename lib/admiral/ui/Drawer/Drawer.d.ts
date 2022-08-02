/// <reference types="react" />
import type { DrawerProps } from './interfaces';
export declare const Drawer: {
    (props: DrawerProps): JSX.Element;
    defaultProps: {
        resetScrollPositionOnClose: boolean;
        keyboard: boolean;
        placement: string;
        showMask: boolean;
        maskClosable: boolean;
        closable: boolean;
    };
};
