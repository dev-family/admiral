import { ReactNode } from 'react';
import { UserIdentity } from '../../../auth/interfaces';
interface Props {
    user: UserIdentity | null;
    menuPopupExtraComponents?: ReactNode;
}
declare function LayoutFooter({ user, menuPopupExtraComponents }: Props): import("react/jsx-runtime").JSX.Element;
export default LayoutFooter;
