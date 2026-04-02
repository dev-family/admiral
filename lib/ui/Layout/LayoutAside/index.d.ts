import React from 'react';
import { UserIdentity } from '../../../auth/interfaces';
declare function LayoutAside({ user, children, }: {
    user: UserIdentity | null;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export default LayoutAside;
