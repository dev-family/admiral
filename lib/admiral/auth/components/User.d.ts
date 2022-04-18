import React from 'react';
import { UserIdentity } from '../../auth/interfaces';
declare type UserCardProps = UserIdentity & {
    collapsed?: boolean;
};
export declare const UserCard: React.FC<UserCardProps>;
export {};
