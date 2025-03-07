import React, { ReactNode } from 'react';
import { UserIdentity } from '../../../auth/interfaces';
interface Props {
    user: UserIdentity | null;
    menuPopupExtraComponents?: ReactNode;
}
declare const LayoutFooter: React.FC<Props>;
export default LayoutFooter;
