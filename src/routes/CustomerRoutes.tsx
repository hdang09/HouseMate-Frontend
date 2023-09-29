import { Navigate, Outlet } from 'react-router-dom';

import Customer from '@/pages/Customer';
import { Role } from '@/utils/enums';
import config from '@/config';
import useAuth from '@/hooks/useAuth';

// Authorization
const CustomerRouter = () => {
    const { role } = useAuth();

    return (role as Role) === Role.CUSTOMER ? <Outlet /> : <Navigate to="/" />;
};

// Define routes for customer
const CustomerRoutes = {
    path: config.routes.customer.home,
    element: <CustomerRouter />,
    children: [{ path: config.routes.customer.home, element: <Customer /> }],
};

export default CustomerRoutes;
