import { lazy } from 'react';
import config from '@/config';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Loginabc'));
const Register = lazy(() => import('@/pages/Register'));
const NotFound = lazy(() => import('@/pages/404'));

const CustomerRoutes = {
    path: '/',
    children: [
        { path: config.routes.home, element: <Home /> },
        { path: config.routes.login, element: <Login /> },
        { path: config.routes.register, element: <Register /> },
        { path: '*', element: <NotFound /> },
    ],
};

export default CustomerRoutes;
