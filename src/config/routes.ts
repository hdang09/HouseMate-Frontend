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
        orderSuccess: '/confirm',
    },
    staff: {
        home: '/staff',
        profile: '/staff/profile',
        job: '/staff/job',
        newJob: '/staff/job/new',
        waitingConfirmJob: '/staff/job/waiting',
        confirmedJob: '/staff/job/confirmed',
        jobDetail: '/staff/job/:jobId',
        task: '/staff/task',
        doneTask: '/staff/task/done',
        incomingTask: '/staff/task/incoming',
        pendingTask: '/staff/task/pending',
        taskDetail: '/staff/task/:taskId',
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
