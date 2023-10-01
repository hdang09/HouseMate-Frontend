import HomeLayout from '@/layouts/HomeLayout';
import Profile from '@/pages/Profile';
import Cart from '@/pages/Cart';
import Purchased from '@/pages/Purchased';
import config from '@/config';

// Authorization
const CustomerRouter = () => {
    // * Uncomment these 2 lines, if you need to authorize role
    // const { role } = useAuth();
    // return role === Role.CUSTOMER ? <HomeLayout /> : <Navigate to="/" />;

    return <HomeLayout />;
};

// Define routes for customer
const CustomerRoutes = {
    element: <CustomerRouter />,
    children: [
        { path: config.routes.customer.purchased, element: <Purchased /> },
        { path: config.routes.customer.cart, element: <Cart /> },
        { path: config.routes.customer.profile, element: <Profile /> },
    ],
};

export default CustomerRoutes;
