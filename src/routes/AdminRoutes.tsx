import AdminLayout from '@/layouts/AdminLayout';
import config from '@/config';
import { lazy } from 'react';

const Dashboard = lazy(() => import('@/pages/Admin/Dashboard'));
const ManageCustomer = lazy(() => import('@/pages/Admin/ManageCustomer'));
const ManageStaff = lazy(() => import('@/pages/Admin/ManageStaff'));
const ViewServiceItem = lazy(() => import('@/pages/Admin/ViewServiceItem'));
const ViewServiceList = lazy(() => import('@/pages/Admin/ViewServiceList'));

// Authorization
const AdminRouter = () => {
    // * Uncomment these 2 lines, if you need to authorize role
    // const { role } = useAuth();
    // return role === Role.ADMIN ? <AdminLayout /> : <Navigate to="/" />;
    return <AdminLayout />;
};

// Define routes for admin
const AdminRoutes = {
    path: config.routes.admin.home,
    element: <AdminRouter />,
    children: [
        { path: config.routes.admin.home, element: <Dashboard /> },
        { path: config.routes.admin.services, element: <ViewServiceList /> },
        { path: config.routes.admin.serviceDetail, element: <ViewServiceItem /> },
        { path: config.routes.admin.manageStaff, element: <ManageStaff /> },
        { path: config.routes.admin.manageCustomer, element: <ManageCustomer /> },
    ],
};

export default AdminRoutes;
