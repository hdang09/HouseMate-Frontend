import { get, post } from './apiCaller';
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

export const getCustomerTable = (customer: object, params: CustomerParams) => {
    return post('/analytics/customer', customer, params);
};
