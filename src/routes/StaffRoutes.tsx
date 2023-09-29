import { Navigate, Outlet } from 'react-router-dom';

import { Role } from '@/utils/enums';
import Staff from '@/pages/Staff';
import config from '@/config';
import useAuth from '@/hooks/useAuth';

// Authorization
const StaffRouter = () => {
    const { role } = useAuth();

    return (role as Role) === Role.STAFF ? <Outlet /> : <Navigate to="/" />;
};

// Define routes for staff
const StaffRoutes = {
    path: config.routes.staff.home,
    element: <StaffRouter />,
    children: [{ path: config.routes.staff.home, element: <Staff /> }],
};

export default StaffRoutes;
