import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/Admin/Dashboard';
import ManageCustomer from '@/pages/Admin/ManageCustomer';
import ManageStaff from '@/pages/Admin/ManageStaff';
import ViewServiceList from '@/pages/Admin/ServiceList';
import config from '@/config';
import CreateService from '@/pages/Admin/CreateService';

// import { Navigate } from 'react-router-dom';
// import { useAuth } from '@/hooks';
// import { Role } from '@/utils/enums';

// Authorization
const AdminRouter = () => {
    // * Uncomment these 2 lines, if you need to authorize ADMIN role
    // const { role } = useAuth();
    // return role === Role.ADMIN ? <AdminLayout /> : <Navigate to="/" />;

    return <AdminLayout />;
};

// Define routes for admin
const AdminRoutes = {
    path: config.routes.admin.dashboard,
    element: <AdminRouter />,
    children: [
        { path: config.routes.admin.dashboard, element: <Dashboard /> },
        { path: config.routes.admin.profile, element: <Dashboard /> },
        { path: config.routes.admin.createSingle, element: <CreateService /> },
        { path: config.routes.admin.createPackage, element: <CreateService /> },
        { path: config.routes.admin.services, element: <ViewServiceList /> },
        { path: config.routes.admin.manageStaff, element: <ManageStaff /> },
        { path: config.routes.admin.manageCustomer, element: <ManageCustomer /> },
    ],
};

export default AdminRoutes;
