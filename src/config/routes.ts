const routes = {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    setPassword: '/set-password',
    home: '/',
    profile: '/profile',
    shop: '/shop',
    cart: '/cart',
    purchased: '/purchased',
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
        manageStaff: '/admin/staffs',
        manageCustomer: '/admin/customers',
    },
};

export default routes;
