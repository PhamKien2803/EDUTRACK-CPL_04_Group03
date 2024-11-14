import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const isAuthenticated = useSelector((state: any) => state.account.isAuthenticated);


    return (
        isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace />
    )
}
