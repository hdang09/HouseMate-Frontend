import StaffLayout from '@/layouts/StaffLayout';

// import Staff from '@/pages/Staff';
import config from '@/config';
import NewJob from '@/pages/Staff/NewJob';

// Authorization
const StaffRouter = () => {
    // * Uncomment these 2 lines, if you need to authorize role
    // const { role } = useAuth();
    // return role === Role.STAFF ? <HomeLayout /> : <Navigate to="/" />;

    return <StaffLayout />;
};

// Define routes for staff
const StaffRoutes = {
    path: config.routes.staff.home,
    element: <StaffRouter />,
    children: [
        // { path: config.routes.staff.home, element: <Staff /> },
        { path: config.routes.staff.newJob, element: <NewJob /> },
    ],
};

export default StaffRoutes;
