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

export enum LinkEnum {
    LINK = 'Link',
    NAV_LINK = 'NavLink',
}

export enum ModalEnum {
    CREATE = 'Create',
    VIEW = 'View',
}
