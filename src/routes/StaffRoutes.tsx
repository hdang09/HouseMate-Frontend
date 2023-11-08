import Job from '@/pages/Staff/Job';
import JobDetail from '@/pages/Staff/JobDetail';
import { Navigate } from 'react-router-dom';
import Profile from '@/pages/Staff/Profile';
import { Role } from '@/utils/enums';
import StaffLayout from '@/layouts/StaffLayout';
import Task from '@/pages/Staff/Task';
import TaskDetail from '@/pages/Staff/TaskDetail';
import config from '@/config';
import { useAuth } from '@/hooks';

// Authorization
const StaffRouter = () => {
    const { role } = useAuth();
    return role === Role.STAFF ? <StaffLayout /> : <Navigate to="/" />;
};

// Define routes for staff
const StaffRoutes = {
    path: config.routes.staff.home,
    element: <StaffRouter />,
    children: [
        { index: true, element: <Navigate to={config.routes.staff.job} /> },
        {
            path: config.routes.staff.job,
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
            path: config.routes.staff.cancelTask,
            element: <Task />,
        },
        {
            path: config.routes.staff.doingTask,
            element: <Task />,
        },
        {
            path: config.routes.staff.taskDetail,
            element: <TaskDetail />,
        },
        {
            path: config.routes.staff.profile,
            element: <Profile />,
        },
    ],
};

export default StaffRoutes;
