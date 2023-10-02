import config from '@/config';
import Home from '@/pages/Home';
import MyPurchased from '@/pages/ViewServiceDetail/MyPurchased';

const CustomerRoutes = {
    path: config.routes.home,
    children: [
        { path: config.routes.home, element: <Home /> },
        { path: config.routes.customer.serviceDetail, element: <MyPurchased /> },
    ],
};

export default CustomerRoutes;
