import Job from '@/pages/Staff/Job';
import JobDetail from '@/pages/Staff/JobDetail';
import { Navigate } from 'react-router-dom';
import Profile from '@/pages/Staff/Profile';
import { Role } from '@/utils/enums';
import Schedule from '@/pages/Staff/Schedule';
import StaffLayout from '@/layouts/StaffLayout';
import Task from '@/pages/Staff/Task';
import TaskDetail from '@/pages/Staff/TaskDetail';
import config from '@/config';
import { useAppSelector } from '@/hooks';

// Authorization
const StaffRouter = () => {
    const role = useAppSelector((state) => state.auth.role);
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
            path: config.routes.staff.arrivedTask,
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
        {
            path: config.routes.staff.schedule,
            element: <Schedule />,
        },
    ],
};

export default StaffRoutes;
