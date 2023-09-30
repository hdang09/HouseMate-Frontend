import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/Admin/Dashboard';
import ManageCustomer from '@/pages/Admin/ManageCustomer';
import ManageStaff from '@/pages/Admin/ManageStaff';
import ViewServiceItem from '@/pages/Admin/ViewServiceItem';
import ViewServiceList from '@/pages/Admin/ViewServiceList';
import config from '@/config';

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
