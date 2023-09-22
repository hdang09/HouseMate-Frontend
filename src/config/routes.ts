const routes = {
    login: '/login',
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
