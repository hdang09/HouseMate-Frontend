import { lazy } from 'react';

import config from '@/config';
import HomeLayout from '@/layouts/HomeLayout';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Shop = lazy(() => import('@/pages/Shop'));
const Purchased = lazy(() => import('@/pages/Purchased'));
const NotFound = lazy(() => import('@/pages/404'));

const PublicRoutes = {
    path: '/',
    element: <HomeLayout />,
    children: [
        { path: config.routes.home, element: <Home /> },
        { path: config.routes.login, element: <Login /> },
        { path: config.routes.shop, element: <Shop /> },
        { path: config.routes.purchased, element: <Purchased /> },
        { path: '*', element: <NotFound /> },
    ],
};

export default PublicRoutes;
