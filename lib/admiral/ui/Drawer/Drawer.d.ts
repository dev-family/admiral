import React from 'react';
import type { DrawerProps } from './interfaces';
export declare type DrawerRef = {
    bodyElement: () => HTMLElement;
};
export declare const Drawer: React.ForwardRefExoticComponent<DrawerProps & React.RefAttributes<DrawerRef>>;
