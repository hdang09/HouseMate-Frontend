import config from '@/config';
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const NotFound = lazy(() => import('@/pages/404'));

const CustomerRoutes = {
    path: '/',
    children: [
        { path: config.routes.home, element: <Home /> },
        { path: config.routes.login, element: <Login /> },
        { path: '*', element: <NotFound /> },
    ],
};

export default CustomerRoutes;
