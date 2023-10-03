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
