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
    INCOMING = 'INCOMING',
    DONE = 'DONE',
    CANCEL = 'CANCEL',
    PROCESSING = 'PROCESSING',
    PENDING = 'PENDING',
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
}

export enum ServiceCategory {
    HOURLY_SERVICE = 'HOURLY_SERVICE',
    RETURN_SERVICE = 'RETURN_SERVICE',
    DELIVERY_SERVICE = 'DELIVERY_SERVICE',
}
