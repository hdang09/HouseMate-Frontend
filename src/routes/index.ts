import AdminRoutes from '../routes/AdminRoutes';
import CustomerRoutes from './CustomerRoutes';
import PublicRoutes from './PublicRoutes';
import StaffRoutes from './StaffRoutes';
import { useRoutes } from 'react-router-dom';

const RoutesComponent = () => {
    return useRoutes([CustomerRoutes, AdminRoutes, StaffRoutes, PublicRoutes]);
};

export default RoutesComponent;
