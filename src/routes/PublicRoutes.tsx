import config from '@/config';
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Forgot = lazy(() => import('@/pages/ForgotPassword'));
const SetPassword = lazy(() => import('@/pages/SetPassword'));
const NotFound = lazy(() => import('@/pages/404'));
const ViewServiceDetail = lazy(() => import('@/pages/ViewServiceDetail'));

const PublicRoutes = {
    path: '/',
    children: [
        { path: config.routes.home, element: <Home /> },
        { path: config.routes.login, element: <Login /> },
        { path: config.routes.register, element: <Register /> },
        { path: config.routes.forgotPassword, element: <Forgot /> },
        { path: config.routes.setPassword, element: <SetPassword /> },
        { path: config.routes.customer.serviceDetail, element: <ViewServiceDetail /> },
        { path: '*', element: <NotFound /> },
    ],
};

export default PublicRoutes;
