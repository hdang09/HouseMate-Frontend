import Customer from '@/pages/Customer';
import { Outlet } from 'react-router-dom';
import config from '@/config';

// Authorization
const CustomerRouter = () => {
    // * Uncomment these 2 lines, if you need to authorize role
    // const { role } = useAuth();
    // return role === Role.CUSTOMER ? <Outlet /> : <Navigate to="/" />;

    return <Outlet />;
};

// Define routes for customer
const CustomerRoutes = {
    path: config.routes.customer.home,
    element: <CustomerRouter />,
    children: [{ path: config.routes.customer.home, element: <Customer /> }],
};

export default CustomerRoutes;
