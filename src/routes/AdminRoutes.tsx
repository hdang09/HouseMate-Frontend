import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/Admin/Dashboard';
import ViewServiceItem from '@/pages/Admin/ViewServiceItem';
import ViewServiceList from '@/pages/Admin/ViewServiceList';
import config from '@/config';

const AdminRoutes = {
    path: config.routes.admin.home,
    element: <AdminLayout />,
    children: [
        { path: config.routes.admin.home, element: <Dashboard /> },
        { path: config.routes.admin.services, element: <ViewServiceList /> },
        { path: config.routes.admin.serviceDetail, element: <ViewServiceItem /> },
    ],
};

export default AdminRoutes;
