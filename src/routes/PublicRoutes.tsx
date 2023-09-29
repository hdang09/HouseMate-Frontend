import { lazy } from 'react';

import config from '@/config';
import HomeLayout from '@/layouts/HomeLayout';

const Home = lazy(() => import('@/pages/Home'));
const Shop = lazy(() => import('@/pages/Shop'));
const Purchased = lazy(() => import('@/pages/Purchased'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Forgot = lazy(() => import('@/pages/ForgotPassword'));
const SetPassword = lazy(() => import('@/pages/SetPassword'));
const NotFound = lazy(() => import('@/pages/404'));

const PublicRoutes = {
    path: '/',
    element: <HomeLayout />,
    children: [
        { path: config.routes.home, element: <Home /> },
        { path: config.routes.shop, element: <Shop /> },
        { path: config.routes.purchased, element: <Purchased /> },
        { path: config.routes.login, element: <Login /> },
        { path: config.routes.register, element: <Register /> },
        { path: config.routes.forgotPassword, element: <Forgot /> },
        { path: config.routes.setPassword, element: <SetPassword /> },
        { path: '*', element: <NotFound /> },
    ],
};

export default PublicRoutes;
