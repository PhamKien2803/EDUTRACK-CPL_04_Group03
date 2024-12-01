import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const isAuthenticated = useSelector((state: { account: { isAuthenticated: boolean } }) => state.account.isAuthenticated);


    return (
        isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace />
    )
}
