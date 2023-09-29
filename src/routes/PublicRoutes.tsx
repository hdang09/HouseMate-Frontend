import { Navigate, Outlet } from 'react-router-dom';

import { Role } from '@/utils/enums';
import config from '@/config';
import { lazy } from 'react';
import useAuth from '@/hooks/useAuth';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Forgot = lazy(() => import('@/pages/ForgotPassword'));
const SetPassword = lazy(() => import('@/pages/SetPassword'));
const NotFound = lazy(() => import('@/pages/404'));

// Authorization
const PublicRouter = () => {
    const { role } = useAuth();

    if (!role) return <Outlet />;
    if ((role as Role) === Role.ADMIN) return <Navigate to={config.routes.admin.home} />;
    if ((role as Role) === Role.CUSTOMER) return <Navigate to={config.routes.customer.home} />;
    if ((role as Role) === Role.STAFF) return <Navigate to={config.routes.staff.home} />;
};

// Define routes for admin
const PublicRoutes = {
    path: '/',
    element: <PublicRouter />,
    children: [
        { path: config.routes.home, element: <Home /> },
        { path: config.routes.login, element: <Login /> },
        { path: config.routes.register, element: <Register /> },
        { path: config.routes.forgotPassword, element: <Forgot /> },
        { path: config.routes.setPassword, element: <SetPassword /> },
        { path: '*', element: <NotFound /> },
    ],
};

export default PublicRoutes;
