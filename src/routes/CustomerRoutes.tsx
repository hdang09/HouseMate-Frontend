import HomeLayout from '@/layouts/HomeLayout';
import MyPurchased from '@/pages/MyPurchased';
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
    children: [{ path: config.routes.customer.purchased, element: <MyPurchased /> }],
};

export default CustomerRoutes;
