import config from '@/config';
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Forgot = lazy(() => import('@/pages/Forgot'));
const NotFound = lazy(() => import('@/pages/404'));

const CustomerRoutes = {
    path: '/',
    children: [
        { path: config.routes.home, element: <Home /> },
        { path: config.routes.login, element: <Login /> },
        { path: config.routes.register, element: <Register /> },
        { path: config.routes.forgot, element: <Forgot /> },
        { path: '*', element: <NotFound /> },
    ],
};

export default CustomerRoutes;
