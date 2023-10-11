import { Navigate, Outlet } from 'react-router-dom';

import Home from '@/pages/Home';
import MainLayout from '@/layouts/MainLayout';
import NotFound from '@/pages/404';
import Profile from '@/pages/Customer/Profile';
import Purchased from '@/pages/Customer/Purchased';
import PurchasedDetail from '@/pages/Customer/PurchasedDetail';
import { Role } from '@/utils/enums';
import ServiceDetail from '@/pages/ServiceDetail';
import Shop from '@/pages/Shop';
import config from '@/config';
import useAuth from '@/hooks/useAuth';

// Authorization
const MainRouter = () => {
    console.log('MainRouter');

    const { role } = useAuth();

    if (role === Role.ADMIN) return <Navigate to={config.routes.admin.home} />;
    if (role === Role.STAFF) return <Navigate to={config.routes.staff.home} />;

    return <MainLayout />;
};

const PublicRouter = () => {
    console.log('PublicRouter');

    return <Outlet />;
};

const CustomerRouter = () => {
    console.log('CustomerRouter');

    const { role } = useAuth();

    // if (!role) return <Navigate to={config.routes.public.login} />;
    // return role === Role.CUSTOMER ? <MainLayout /> : <Navigate to={config.routes.public.login} />;
    return role === Role.CUSTOMER ? <Outlet /> : <Navigate to={config.routes.public.login} />;
};

// Define routes for admin
const MainRoutes = {
    path: '/',
    element: <MainRouter />,
    children: [
        {
            element: <PublicRouter />,
            children: [
                { path: config.routes.public.home, element: <Home /> },
                { path: config.routes.public.shop, element: <Shop /> },
                { path: config.routes.public.serviceDetail, element: <ServiceDetail /> },
            ],
        },
        {
            element: <CustomerRouter />,
            children: [
                { path: config.routes.customer.purchased, element: <Purchased /> },
                { path: config.routes.customer.purchasedDetail, element: <PurchasedDetail /> },
                { path: config.routes.customer.profile, element: <Profile /> },
            ],
        },
        { path: '*', element: <NotFound /> },
    ],
};

export default MainRoutes;
