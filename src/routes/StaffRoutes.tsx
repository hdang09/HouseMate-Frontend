import StaffLayout from '@/layouts/StaffLayout';

// import Staff from '@/pages/Staff';
import config from '@/config';
import Job from '@/pages/Staff/Job';

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
        { path: config.routes.staff.job, element: <Job /> },
        { path: config.routes.staff.newJob, element: <Job /> },
        { path: config.routes.staff.waitingConfirmJob, element: <Job /> },
        { path: config.routes.staff.confirmedJob, element: <Job /> },
    ],
};

export default StaffRoutes;
