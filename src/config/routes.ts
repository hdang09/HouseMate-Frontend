const routes = {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    setPassword: '/set-password',
    home: '/',
    services: '/services',
    serviceDetail: '/services/:serviceId',
    logout: '/logout',
    customer: {
        home: '/customer',
    },
    staff: {
        home: '/staff',
    },
    admin: {
        home: '/admin',
        services: '/admin/services',
        serviceDetail: '/admin/services/:serviceId',
    },
};

export default routes;
