import AdminRoutes from '@/routes/AdminRoutes';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import StaffRoutes from './StaffRoutes';
import checkTokenInURL from '@/utils/checkTokenInURL';
import { useRoutes } from 'react-router-dom';
import { useScrollToTop } from '@/hooks';

const RoutesComponent = () => {
    useScrollToTop();
    checkTokenInURL();

    return useRoutes([AuthRoutes, AdminRoutes, StaffRoutes, MainRoutes]);
};

export default RoutesComponent;
