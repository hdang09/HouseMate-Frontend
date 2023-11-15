import AdminRoutes from '@/routes/AdminRoutes';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import StaffRoutes from './StaffRoutes';
import { useRoutes } from 'react-router-dom';
import { useAppDispatch, useScrollToTop } from '@/hooks';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import cookieUtils from '@/utils/cookieUtils';
import { JwtType, login } from '@/pages/Login/Login.slice';

const RoutesComponent = () => {
    useScrollToTop();

    // Check token in URL
    const token = cookieUtils.getToken();

    // URL location
    let location = useLocation();

    const dispatch = useAppDispatch();

    // Check if token exists in URL
    useEffect(() => {
        // Store token to cookie
        const UrlParams = new URLSearchParams(location.search);
        if (UrlParams.get('success') === 'true') {
            cookieUtils.setToken(UrlParams.get('token') || '');
            dispatch(login());
        }

        if (!token) return;

        const payload = cookieUtils.decodeJwt() as JwtType;

        if (!payload) return;

        // Check expiration
        if (payload.exp < Date.now() / 1000) {
            cookieUtils.deleteUser();
        }
    }, [location, token]);

    return useRoutes([AuthRoutes, AdminRoutes, StaffRoutes, MainRoutes]);
};

export default RoutesComponent;
