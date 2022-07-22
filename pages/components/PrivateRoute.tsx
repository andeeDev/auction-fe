import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../logic/authSlice';
import { Routes } from '../../utils/Routes';
import Link from 'next/link';
import { PrivateRouteProps } from '../../utils/interfaces';

export default function PrivateRoute({ children, href }: PrivateRouteProps) {
    const user = useSelector(selectCurrentUser);

    const isVerified = (): boolean => user.isVerified;

    const userExists = (): boolean => user.email !== null && user.token !== null;

    if (userExists() && !isVerified()) {
        return <Link href={Routes.confirm}>{children}</Link>;
    }

    if (!userExists()) {
        return <Link href={Routes.login}>{children}</Link>;
    }

    return <Link href={href}>{children}</Link>;
}
