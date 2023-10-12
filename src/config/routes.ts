const routes = {
    public: {
        home: '/',
        login: '/login',
        register: '/register',
        forgotPassword: '/forgot-password',
        setPassword: '/set-password',
        shop: '/shop',
        serviceDetail: '/shop/:serviceId',
    },
    customer: {
        profile: '/profile',
        cart: '/cart',
        checkout: '/checkout',
        purchased: '/purchased',
        purchasedDetail: '/purchased/:purchasedId',
        viewScheduleDetail: '/purchased/:purchasedId/:taskId',
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
    api: {
        loginGoogle: '/auth/callback/google/redirect',
    },
};

export default routes;
