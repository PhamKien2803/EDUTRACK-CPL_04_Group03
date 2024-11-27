import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

export const Layout = () => {
    const account = useSelector((state: { account: { account: { Role: number } } }) => state.account.account);
    const isAuthenticated = useSelector((state: { account: { isAuthenticated: boolean } }) => state.account.isAuthenticated);

    if (isAuthenticated) {
        switch (account.Role) {
            case 2: return <Navigate to={"home-page"} />
            case 0: return <Navigate to={"/dashboardPage"} />
            case 1: return <Navigate to={"/lecturer/homePage"} />
        }

    }else {
        return <Navigate to={"/landing-page"} />
    }
    return <Outlet />
}
