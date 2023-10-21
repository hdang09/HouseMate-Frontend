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
    ONSALE = 'ONSALE',
    AVAILABLE = 'AVAILABLE',
    DISCONTINUED = 'DISCONTINUED',
}

export enum Category {
    SINGLE_SERVICE = 'Single',
    SINGLE_SERVICE_UPPER = 'SINGLE',
    PACKAGE_SERVICE = 'Package',
    PACKAGE_SERVICE_UPPER = 'PACKAGE',
    ALL = '',
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
    TASK_DETAIL = 'Chi tiết công việc',
}

export enum GroupType {
    HOURLY_SERVICE = 'HOURLY_SERVICE',
    RETURN_SERVICE = 'RETURN_SERVICE',
    DELIVERY_SERVICE = 'DELIVERY_SERVICE',
    OTHER = 'OTHER',
}

export enum Rating {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
}

export enum SortBy {
    NAME = 'NAME',
    PRICE = 'PRICE',
    NUMBER_OF_SOLD = 'NUMBER_OF_SOLD',
}

export enum OrderBy {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum ServiceCategory {
    HOURLY_SERVICE = 'HOURLY_SERVICE',
    RETURN_SERVICE = 'RETURN_SERVICE',
    DELIVERY_SERVICE = 'DELIVERY_SERVICE',
}

export enum UnitEnum {
    HOUR = 'Hour',
    TIMES = 'Times',
    TIME = 'Time',
    ITEM = 'Item',
    COMBO = 'Combo',
}

export enum CategoryServiceEnum {
    HOURLY_SERVICE = 'HOURLY_SERVICE',
    RETURN_SERVICE = 'RETURN_SERVICE',
    DELIVERY_SERVICE = 'DELIVERY_SERVICE',
}

export enum PeriodEnum {
    '3_MONTH' = '3_MONTH',
    '6_MONTH' = '6_MONTH',
    '9_MONTH' = '9_MONTH',
    '12_MONTH' = '12_MONTH',
}
