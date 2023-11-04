import AdminLayout from '@/layouts/AdminLayout';
import CreateService from '@/pages/Admin/CreateService';
import Dashboard from '@/pages/Admin/Dashboard';
import ManageCustomer from '@/pages/Admin/ManageCustomer';
import ManageStaff from '@/pages/Admin/ManageStaff';
import { Navigate } from 'react-router-dom';
import { Role } from '@/utils/enums';
import Setting from '@/pages/Admin/Setting';
import ViewServiceList from '@/pages/Admin/ServiceList';
import CreateStaff from '@/pages/Admin/CreateStaff';
import config from '@/config';
import { useAuth } from '@/hooks';

// Authorization
const AdminRouter = () => {
    const { role } = useAuth();
    return role === Role.ADMIN ? <AdminLayout /> : <Navigate to="/" />;
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
        { path: config.routes.admin.createStaff, element: <CreateStaff /> },
        { path: config.routes.admin.manageCustomer, element: <ManageCustomer /> },
        { path: config.routes.admin.setting, element: <Setting /> },
    ],
};

export default AdminRoutes;
