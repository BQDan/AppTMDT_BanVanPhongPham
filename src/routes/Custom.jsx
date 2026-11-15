import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function RequiredAuth(){
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    if(!isAuthenticated)
        return <Navigate to='/login' replace state={{from: location.pathname}} />;
    return <Outlet />;
}

export function Custom(){
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? <Navigate to='/' replace /> : <Outlet />;
}