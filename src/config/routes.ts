const routes = {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    setPassword: '/set-password',
    home: '/',

    logout: '/logout',
    customer: {
        home: '/customer',
        services: '/services',
        serviceDetail: '/services/:serviceId',
    },
    staff: {
        home: '/staff',
    },
    admin: {
        home: '/admin',
        services: '/admin/services',
        serviceDetail: '/admin/services/:serviceId',
        manageStaff: '/admin/staffs',
        manageCustomer: '/admin/customers',
    },
};

export default routes;
