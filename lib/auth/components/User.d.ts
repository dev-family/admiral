import React from 'react';
import { UserIdentity } from '../../auth/interfaces';
type UserCardProps = UserIdentity & {
    collapsed?: boolean;
};
export declare function UserCard({ fullName, email, avatar, collapsed, children, }: UserCardProps & {
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
