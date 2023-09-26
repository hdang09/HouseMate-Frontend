import config from '@/config';
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const NotFound = lazy(() => import('@/pages/404'));
const ViewServiceDetail = lazy(() => import('@/pages/ViewServiceDetail'));

const CustomerRoutes = {
    path: '/',
    children: [
        { path: config.routes.home, element: <Home /> },
        { path: config.routes.login, element: <Login /> },
        { path: config.routes.customer.serviceDetail, element: <ViewServiceDetail /> },
        { path: '*', element: <NotFound /> },
    ],
};

export default CustomerRoutes;
