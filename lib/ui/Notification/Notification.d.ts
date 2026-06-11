import React from 'react';
import { NotificationContentProps, NotificationProps } from './interfaces.js';
export declare function NotificationContent({ icon, type, message, description, closable, }: NotificationContentProps): import("react/jsx-runtime").JSX.Element;
/**
 * Renders the rc-notification holder and registers the imperative API used by
 * `Notification()`. Mounted automatically by `<Admin>`. When using `Notification`
 * without `<Admin>`, mount it manually under your ThemeProvider.
 */
export declare function NotificationHost(): React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
export declare const Notification: (args: NotificationProps) => void;
