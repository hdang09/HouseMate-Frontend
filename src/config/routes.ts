const routes = {
    login: '/login',
    register: '/register',
    forgot: '/forgot',
    home: '/',
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
