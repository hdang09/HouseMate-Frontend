import { get, post, remove } from './apiCaller';
import { OrderBy } from './enums';

export type CustomerParams = {
    searchCustomerName?: string;
    sortTotalOrderPrice?: OrderBy;
    sortNumberOfOrder?: OrderBy;
};

export const getOverView = (day: number) => {
    return get(`/analytics/overview/days-ago/${day}`);
};

export const getUserChart = (day: number) => {
    return get(`/analytics/user/days-ago/${day}`);
};

export const getRevenueChart = (day: number) => {
    return get(`/analytics/revenue/days-ago/${day}`);
};

export const getCustomerTable = (body: object, params: CustomerParams) => {
    return post('/analytics/customer', body, params);
};

export const getTopServiceList = (body: object) => {
    return post('/analytics/service-page', body);
};

export const getStaffTable = () => {
    return get('/account/staffs');
};

export const banAccount = (userId: number) => {
    return remove(`/account/delete/${userId}`);
};
