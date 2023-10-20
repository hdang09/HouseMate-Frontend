export enum PageEnum {
    LOGIN = 'Login',
    REGISTER = 'Register',
    FORGOT_PASSWORD = 'ForgotPassword',
    SET_PASSWORD = 'SetPassword',
}

export const Role: { [key: string]: string } = {
    CUSTOMER: 'CUSTOMER',
    STAFF: 'STAFF',
    ADMIN: 'ADMIN',
};

export enum SaleStatus {
    NOT_AVAILABLE,
    AVAILABLE,
    DISCONTINUED,
}

export enum Category {
    SINGLE_SERVICE = 'Single',
    PACKAGE_SERVICE = 'Package',
}

export enum LinkEnum {
    LINK = 'Link',
    NAV_LINK = 'NavLink',
}

export enum UnitOfMeasure {
    HOUR = 'Hour',
    KG = 'Kg',
    TIME = 'Time',
    LITER = 'Liter',
    COMBO = 'Combo',
}

export enum Status {
    INCOMING = 'Incoming',
    DONE = 'Done',
    CANCEL = 'Cancel',
    PROCESSING = 'Processing',
    PENDING = 'Pending',
}

export enum Service {
    CLEANING = 'Cleaning house',
    WATER = 'Water delivery',
    RICE = 'Rice delivery',
    LAUNDRY = 'Laundry',
}

export enum ModalEnum {
    CREATE = 'Create',
    VIEW = 'View',
}

export enum CycleEnum {
    ONLY_ONE_TIME = 'ONLY_ONE_TIME',
    EVERY_WEEK = 'EVERY_WEEK',
    EVERY_MONTH = 'EVERY_MONTH',
}

export enum StaffLabelHeader {
    JOB = 'Công việc',
    JOB_DETAIL = 'Chi tiết công việc',
    TASK = 'Danh sách công việc',
    TASK_DETAIL = 'Chi tiết công việc',
}
