const routes = {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    setPassword: '/set-password',
    home: '/',
    logout: '/logout',
    customer: {
        services: '/services',
        serviceDetail: '/services/:serviceId',
        purchased: '/purchased',
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
