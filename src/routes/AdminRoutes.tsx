import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/Admin/Dashboard';
import ManageCustomer from '@/pages/Admin/ManageCustomer';
import ManageStaff from '@/pages/Admin/ManageStaff';
import ViewServiceItem from '@/pages/Admin/ViewServiceItem';
import ViewServiceList from '@/pages/Admin/ViewServiceList';
import config from '@/config';
import CreateSingleService from '@/pages/Admin/CreateSingleService';
import CreatePackageService from '@/pages/Admin/CreatePackageService';

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
        { path: config.routes.admin.createSingle, element: <CreateSingleService /> },
        { path: config.routes.admin.createPackage, element: <CreatePackageService /> },
        { path: config.routes.admin.services, element: <ViewServiceList /> },
        { path: config.routes.admin.serviceDetail, element: <ViewServiceItem /> },
        { path: config.routes.admin.manageStaff, element: <ManageStaff /> },
        { path: config.routes.admin.manageCustomer, element: <ManageCustomer /> },
    ],
};

export default AdminRoutes;
