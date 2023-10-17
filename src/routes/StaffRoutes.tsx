import Job from '@/pages/Staff/Job';
import { Navigate } from 'react-router-dom';
import StaffLayout from '@/layouts/StaffLayout';
import config from '@/config';

// import Staff from '@/pages/Staff';

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
        { index: true, element: <Navigate to={config.routes.staff.newJob} /> },
        {
            path: config.routes.staff.newJob,
            element: <Job />,
        },
        {
            path: config.routes.staff.waitingConfirmJob,
            element: <Job />,
        },
        {
            path: config.routes.staff.confirmedJob,
            element: <Job />,
        },
    ],
};

export default StaffRoutes;
