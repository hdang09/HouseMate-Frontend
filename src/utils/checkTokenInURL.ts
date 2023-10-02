import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import cookieUtils from '@/utils/cookieUtils';

type JwtType = {
    exp: number;
};

const checkTokenInURL = () => {
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
};

export default checkTokenInURL;
