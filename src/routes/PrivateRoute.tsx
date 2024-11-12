import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state: any) => state.account.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={'/login'}></Navigate>
    }
    return (
        <>
            {children}
        </>
    )
}
