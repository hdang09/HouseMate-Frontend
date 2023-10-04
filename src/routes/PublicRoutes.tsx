import { Navigate, Outlet, useLocation } from 'react-router-dom';

import config from '@/config';
import useAuth from '@/hooks/useAuth';

import MainLayout from '@/layouts/MainLayout';
import NotFound from '@/pages/404';
import Register from '@/pages/Register';
import { Role } from '@/utils/enums';
import SetPassword from '@/pages/SetPassword';
import Shop from '@/pages/Shop';

// Authorization
const PublicRouter = () => {
    const { role } = useAuth();

    if (role) {
        if (role === Role.ADMIN) return <Navigate to={config.routes.admin.home} />;
        if (role === Role.STAFF) return <Navigate to={config.routes.staff.home} />;
    }

    const location = useLocation();
    if (
        [
            config.routes.public.login,
            config.routes.public.register,
            config.routes.public.forgotPassword,
            config.routes.public.setPassword,
        ].includes(location.pathname)
    )
        return <Outlet />;

    return <MainLayout />;
};

// Define routes for admin
const PublicRoutes = {
    path: '/',
    element: <PublicRouter />,
    children: [
        { path: config.routes.public.home, element: <Home /> },
        { path: config.routes.public.login, element: <Login /> },
        { path: config.routes.public.register, element: <Register /> },
        { path: config.routes.public.forgotPassword, element: <Forgot /> },
        { path: config.routes.public.setPassword, element: <SetPassword /> },
        { path: config.routes.public.shop, element: <Shop /> },
        { path: '*', element: <NotFound /> },
    ],
};

export default PublicRoutes;
