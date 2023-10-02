import { useRoutes } from 'react-router-dom';

import { useScrollToTop } from '@/hooks';
import AdminRoutes from '@/routes/AdminRoutes';
import checkTokenInURL from '@/utils/checkTokenInURL';
import CustomerRoutes from './CustomerRoutes';
import PublicRoutes from './PublicRoutes';
import StaffRoutes from './StaffRoutes';

const RoutesComponent = () => {
    useScrollToTop();
    checkTokenInURL;

    return useRoutes([PublicRoutes, AdminRoutes, StaffRoutes, CustomerRoutes]);
};

export default RoutesComponent;
