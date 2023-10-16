import { get, post } from './apiCaller';

export const createPayment = (userInfo: object) => {
    return post('/payment/create', userInfo);
};

export const checkPayment = (params: string) => {
    return get(`/payment/check${params}`);
};
