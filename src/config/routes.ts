const routes = {
    public: {
        home: '/',
        login: '/login',
        register: '/register',
        forgotPassword: '/forgot-password',
        setPassword: '/set-password',
        logout: '/logout',
        shop: '/shop',
        serviceDetail: '/shop/:serviceId',
    },
    customer: {
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
};

export default routes;
