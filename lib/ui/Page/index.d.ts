import React from 'react';
export type PageProps = {
    title: string;
    actions?: React.ReactNode;
    topContent?: React.ReactNode;
};
export declare function Page({ children, title, actions, topContent, }: PageProps & {
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
