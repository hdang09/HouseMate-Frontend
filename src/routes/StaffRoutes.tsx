import HomeLayout from '@/layouts/MainLayout';
import Staff from '@/pages/Staff';
import config from '@/config';

// Authorization
const StaffRouter = () => {
    // * Uncomment these 2 lines, if you need to authorize role
    // const { role } = useAuth();
    // return role === Role.STAFF ? <HomeLayout /> : <Navigate to="/" />;

    return <HomeLayout />;
};

// Define routes for staff
const StaffRoutes = {
    path: config.routes.staff.home,
    element: <StaffRouter />,
    children: [{ path: config.routes.staff.home, element: <Staff /> }],
};

export default StaffRoutes;
