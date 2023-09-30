import { Navigate, Outlet } from 'react-router-dom';

import Forgot from '@/pages/ForgotPassword';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/404';
import Register from '@/pages/Register';
import { Role } from '@/utils/enums';
import SetPassword from '@/pages/SetPassword';
import config from '@/config';
import useAuth from '@/hooks/useAuth';

// Authorization
const PublicRouter = () => {
    const { role } = useAuth();

    if (!role) return <Outlet />;
    if (role === Role.ADMIN) return <Navigate to={config.routes.admin.home} />;
    if (role === Role.CUSTOMER) return <Navigate to={config.routes.customer.home} />;
    if (role === Role.STAFF) return <Navigate to={config.routes.staff.home} />;
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
