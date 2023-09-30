import { useLocation, useRoutes } from 'react-router-dom';

import AdminRoutes from '@/routes/AdminRoutes';
import CustomerRoutes from './CustomerRoutes';
import PublicRoutes from './PublicRoutes';
import StaffRoutes from './StaffRoutes';
import cookieUtils from '@/utils/cookieUtils';
import { useEffect } from 'react';

type JwtType = {
    exp: number;
};

const RoutesComponent = () => {
    // Token
    const token = cookieUtils.getToken();

    // URL location
    let location = useLocation();

    // Check if token exists in URL
    useEffect(() => {
        // Store token to cookie
        const UrlParams = new URLSearchParams(location.search);
        if (UrlParams.get('success') === 'true') {
            cookieUtils.setToken(UrlParams.get('token') || '');
        }

        if (!token) return;

        const payload = cookieUtils.decodeJwt() as JwtType;

        if (!payload) return;

        // Check expiration
        if (payload.exp < Date.now() / 1000) {
            cookieUtils.deleteUser();
            // toast.info('Your session has expired. Please login again!');
        }
    }, [location, token]);

    return useRoutes([PublicRoutes, AdminRoutes, StaffRoutes, CustomerRoutes]);
};

export default RoutesComponent;
