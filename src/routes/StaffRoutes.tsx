import { Navigate } from 'react-router-dom';
import config from '@/config';
import StaffLayout from '@/layouts/StaffLayout';
import Job from '@/pages/Staff/Job';
import JobDetail from '@/pages/Staff/JobDetail';
import Task from '@/pages/Staff/Task';
import TaskDetail from '@/pages/Staff/TaskDetail';

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
            path: config.routes.staff.job,
            element: <Navigate to={config.routes.staff.newJob} />,
        },
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
        {
            path: config.routes.staff.jobDetail,
            element: <JobDetail />,
        },
        {
            path: config.routes.staff.task,
            element: <Navigate to={config.routes.staff.incomingTask} />,
        },
        {
            path: config.routes.staff.incomingTask,
            element: <Task />,
        },
        {
            path: config.routes.staff.doneTask,
            element: <Task />,
        },
        {
            path: config.routes.staff.pendingTask,
            element: <Task />,
        },
        {
            path: config.routes.staff.taskDetail,
            element: <TaskDetail />,
        },
    ],
};

export default StaffRoutes;
