import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

export const Layout = () => {
    const account = useSelector((state: any) => state.account.account);
    const isAuthenticated = useSelector((state: any) => state.account.isAuthenticated);

    if (isAuthenticated) {
        switch (account.Role) {
            case 2: return <Navigate to={"home-page"} />
            case 0: return <Navigate to={"/home-page"} />
            case 1: return <Navigate to={"/lecturer/homePage"} />

        }

    }

    return <Outlet />
}
