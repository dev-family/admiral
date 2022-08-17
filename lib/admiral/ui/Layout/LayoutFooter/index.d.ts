import React from 'react';
import { UserIdentity } from '../../../auth/interfaces';
declare const LayoutFooter: React.FC<{
    user: UserIdentity | null;
}>;
export declare function Logout(): JSX.Element;
export default LayoutFooter;
